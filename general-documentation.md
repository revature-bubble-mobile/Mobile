# Bubbl(e) Mobile Documentation

## Overview

---

Bubbl(e) Mobile is a mobile version of the [Bubbl(e) Web-App](http://ec2-44-197-172-46.compute-1.amazonaws.com:3000/login). This mobile version was created to be a one-to-one visual and functional representation of the web version as possible. The mobile and web versions were created by two different teams. For the front end, the majority of features that could be replicated were included. Some features could not be replicated one for one because of several issues found with the backend originally created for the web version. These changes are documented within the web-app changes section.

### Expo and Node Modules

Bubbl(e) Mobile was created using Expo with TypeScript. Expo was used as it create a dev server and pulls together several community bode modules that are commonly used together. Expo can normally be used to emulate the application on Web (within a browser), Android and IOS. However, the Web emulation will not currently work and this application will only run on either a physical mobile device or a mobile emulator.

React Native (for mobile development) is behind in release version from the current React (for web development). Expo is also behind from React Native current release version. Because of this some feature and common node modules that are commonly used may cause issues. One such example is Enzyme for testing.

Enzyme is a testing frame work build off of the Jest frame work. To get Enzyme to work, another module _'Enzyme for react'_ needed to be included and a patch also runs.

The following is a list of node modules that where added that are _not included_ in Expo. Running npm i or yarn install will initialize the project:

1. \*\*react-native-reanimated
2. react-native-gesture-handler
3. react-native-elements
4. react-native-safe-area-context
5. react-native-screens
6. enzyme
7. redux
8. react-redux

The package _'react-native-reanimated'_ does not work on web. If desired to also use Expo to also package a static website version, this package will need to be uninstalled and any component dependencies will need to be re-worked.

## Web-App Changes

---

### **General Changes**

The first major different between the two versions of the application are the backend used. At the start of project an initial API was given ([API Document](http://ec2-44-197-172-46.compute-1.amazonaws.com:5000/swagger-ui.html#/)).

The end point needed for this API is: http://ec2-44-197-172-46.compute-1.amazonaws.com:5000/

When testing the API using the web version, it was discovered that several undesirable behavior was found. One example being, when loading and creating post, All other post and any user profile associate with each one was copied into post object sent to the server and an update object was sent back. This nest a large amount of the database within a single post and included redundant data. Along with this, all image where stored as base 64 string and was also included. This created and issue where around 2Mb of information was sent each time a single get was called for a user post. This created long load times.

The original backend was redesigned with some fixes but this was presented several days into development of the mobile version. The decision was made early on to use Firebase an Azure for the backend. By the time the fix on the original backend was made, the decision was made to continue with Firebase and Azure.

### **API Changes**

Not all functionality that the original backend could be replicated one-to-one for the Firebase-Azure backend. Instead it was decided upon to have all DTOs match the responses from the original backend as close as possible. Not all endpoints and behaviors could be created exactly, but the overall functional match.

To get this to work, two different endpoints where used. One for Firebase and one for Azure:

- Azure: https://wk-revature-bubble-mobile.azurewebsites.net/api
- Firebase: https://bubble-app-82a5a-default-rtdb.firebaseio.com

**For Future Reworking** The easiest way to have have no changes made to the frontend and have it compatible with a different backend would be the following:

1. All HTTP calls reference to one of these endpoint within the _endpoints.ts_ file. Simple change these endpoints as desired to the endpoint of another backend.
2. To ensure consistent behavior, it would be recommended to map all end points to an Azure Function (or equivalent service) as _"glue code."_ From here this function can interact with the database or other API as need that could filter and manipulate the functionality of the Firebase-Azure backend.

The reason for having two different backend was to easily streamline how IDs for the firebase database are created. By default, Firebase stores all information in the database as one single json. From there All other data is attached to this json as a property with a specific key.

```JavaScript
MainObject:{
    key1:{
        pid:'ExampleID1',
        property1:...,
    },
    key2:{
        pid:'ExampleID2',
        property1:...,
    },
    ...
}
```

The issue found is that the key is generated by Firebase and in order to get that object associated with this key, one needs to know this key and use it to made a get request to Firebase. Using this system, there is no direct way to get a single object without having to call all data and filter. This is undesirable for security, efficiently and latency.

The second issue came with the ability to login. Firebase does have _"Firebase Authentication"_ which is a system that could be used. However, this information was discovered late in development of the application. Because of the three week window for development, it was decided that it would be easier not to include this as it would have taken a large time investment to learn how to incorporate the login information and user data as one return from a patch request.

### **Azure backend**

The Azure backend was used to fix both these problems. All post request to create any new data was is sent to the Azure endpoint. The Azure function will then create a new object and associate all needed information to make get request easier.

```JavaScript
mainObject:{
->  uuid1:{ // uuid created by Azure
->      pid:uuid1, // same uuid
        property1:...,
    },
    uuid2:{
        pid:uuid2,
        property1:...,
    },
    ...,
}
```

Creating the system mentioned above embeds the key within the pid property. The pid is used as the key needed by the frontend to make a call to the backend to reference the correct object within the main json.

When trying to login, using a patch on {AzureEndPoint}/login will search the database for a profile that has the correct username and password and return that object found.

### **Firebase backend**

All calls that are not a Post or specific a Patch to login user the Firebase Database directly as a backend. This is only for testing purposes and should be changed. The reason is that any person from anywhere can run full crud operations without any security. Normally for Firebase rules are supposed to be defined to restrict what users can and cannot perform on the database. For development this has been ignore. For future iteration, if continuing with Firebase, either setting up the Firebase rules or use an intermediate server to handle security and permissions.

Firebase is a NoSQL type database. All data within the database can be changed at runtime and does not need to confirm to a set data model or scheme. The base url links the main json. All other routes map to a specific property within the json similar to a tree. All data under the last route specified will be returned as one single object.

```TypeScript
const url = `${firebaseUrl}/profiles/bbb`
>/*firebaseUrl*/root:{
>    /*Profiles*/ profiles:{
                     aaa:{pid:string, username, password}
>            /*bbb*/ bbb:{pid:string, username, password, followers[],likes[]}
                     ccc:{pid:string, username, password, likes[]}
                },
                post: {
                    post1:{}
                    post2:{}
                    post3:{}
                },
                comments:{
                    ....
                }
            }
// Using the url above will return an object with the following properties:
const objectReturned = {pid:string, username, password, followers[],likes[]}.
```

\*\*Note: none of the data under profiles is consistent with all same the properties.
Ideally the same data would be saved for all entries. However checking on the front end may be useful to avoid unexpected errors.
Currently to interact with all data within Firebase, no matter the type, the crud operations all work the same. Not all crud operations will. Note All routes must have _.json_ appended to the end for Firebase to work properly.

#### **get request:**

Sending a get request to {Firebase Endpoint}/{key1}/{key2}/{key3}/.../keyN.json will return an object with all properties under that key. All data must then be filtered and manipulated from the front end.

```TypeScript
const route:string = `https://bubble-app-82a5a-default-rtdb.firebaseio.com/profiles.json`
// this will return all profiles within the database.
```

Adding an ID (specific the ID setup by the Azure function), it will retrieve item with that key.

```TypeScript
const id:string = 'uuid here'
const route:string = `https://bubble-app-82a5a-default-rtdb.firebaseio.com/profiles/${id}.json`
// this will return an object that has the same key found on the main json object.
//The key here is the id passed and should be the same that the Azure function created.
const object:type = await httpCall(url)
```

#### **Put and Patch request:**

All updates to the database communicate directly with the Firebase Database.

- any Put request will remove and replace all data under the route specified with the data given within the body of the request.
- any Patch will added, and or replace, only properties specified within the body of the request.
  -If the properties exist, they will be replaced.
  -if they do not exist, they will be added.

Both verbs will send back the object in the database as a json with the updated changes.

```TypeScript
// this url is used as a post or patch
const url = `${firebaseUrl}/profiles/bbb.json`
const object:type = await httpCall(url)
{type}/*Return Json*/


```

#### **Post request:**

No post request should be made to the Firebase backend. All post request should go to the Azure backend.

#### **Delete request:**

The front end does not currently have any deleting functionality implemented.

### **Data Models**

The following is a list of all DTOs used within the frontend.

```TypeScript
interface Profile {
    /**Profile ID string, used when trying to map the route with the appropriate key on Firebase*/
    pid: string;
    firstName: string;
    lastName: string;
    /**Hashed value obtained from an existing JWT */
    passkey: string;
    email: string;
    username: string;
    imgurl?: string;
    verification?: boolean;
    followers: string[];
    following: string[];
}
interface Comment {
    /**Comment ID string, used when trying to map the route with the appropriate key on Firebase */
    cid: string;
    /**ID string of a profile that created the comment */
    writer: string;
    /**ID string of a post */
    post: string;
    /**Text entered when creating the Comment */
    message: string;
    dateCreated: Date;
    previous?: string;
}
interface Post {
    /**Unique ID of the Post, used when trying to map the route with the appropriate key on Firebase */
    psid: string;
    /**ID string of a profile that created the post */
    creator: string;
    /**Text entered when creating the Post */
    body: string;
    datePosted: Date;
    imgURL?: string;
}
```

When using the Patch with the login route to Azure, the following should be sent to the server:

```TypeScript
//Json sent
const body = {username:string,password:string}
const response = await axios.patch(url,body)
const loginProfile = response.data
```

When using the Post-> /{dataType} route with Azure, the following should be sent to the server:

When using any firebase route, it is expected that the type send will be the same as the type requested using the corresponding id.

```TypeScript
const url:string = pid|cid|psid; // only one should be used, but any of the three are valid
// if using a put the full data model should be added as a body
1. pid     =>const body = {Profile}     // if put, include body
2. cid     =>const body =  {Comment}    // if put, include body
3. psid    =>const body = {Post}        // if put, include body

// if using a Patch, only include the data you want to update
// then make a call as needed, the following ids will map as followed
const response = axios.verb(url,body)
                // pid     | cid   | psid
const loginProfile:Profile |Comment|Post = response.data
```

Example get all profiles

```TypeScript
const url = `${firebaseUrl}/Profile`
const profileArray:Profile[]= await axois.get(url)
```

Example get single profile by ID

```TypeScript
const profile; // local profile in app from the redux store
const url = `${firebaseUrl}/Profile/${profile.pid}`
const profileArray:Profile= await axios.get(url)
```

Example put single profile by ID

```TypeScript
const profile; // local profile in app from the redux store
const body:Profile= {/*All profile properties*/}
const url = `${firebaseUrl}/Profile/${profile.pid}`
// This profile should be a complete replacement
const profileArray:Profile= await axios.put(url,body)
```

Example patch single profile by ID

```TypeScript
const profile; // local profile in app from the redux store
const followers = [/*new data*/]
const body= {followers}
const url = `${firebaseUrl}/Profile/${profile.pid}`
// This profile should be a new profile with the changes made
const profileArray:Profile= await axios.patch(url,body)
```

### **JWT**

Currently there is no implementation for JWTs which the Web version receive from the original backend. This was not included because of time constraints. However, in the profile data model, 'passkey' does exist that would be the JWT that the original backend should send.

## Feature Breakdown

---

Bubbl(e) Mobile includes the following features:

- placeholder
- placeholder
- placeholder
- placeholder
- placeholder
- placeholder
- placeholder
