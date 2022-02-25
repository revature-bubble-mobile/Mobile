import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import firebaseEndpoint from '../../../endpoints';
import { User } from '../../../store';
import UpdateProfileButton from '../interactive/UpdateProfileButton';
import ViewPostsOrFollowers from './ViewPostsOrFollowers';
import Profile from '../../../dtos/profile'

/** This is the primary component for the profile page. All other profile components will be nested in this component. */
export default function ProfileView(props: {pid: string}) {
  const tempUser: User = useSelector((state: User) => state);
  const [currentUser, setCurrentUser] = useState<User>(tempUser);
  function checkUser(): boolean {
    return tempUser?.profile?.pid === props?.pid; 
  }
  useEffect(() => {
    httpSetUser()
  }, []);


  
  
  async function httpSetUser() {  
    if(checkUser()) {
      
      setCurrentUser(tempUser);
      return;
    } else {
      try {
        const response: AxiosResponse = await axios.get(`${firebaseEndpoint}profile/${props.pid}.json`);
        const profile: Profile = response.data;
        const user: User = {
          profile
        };
        setCurrentUser(user);
      } catch(error) {
        
        setCurrentUser(tempUser);
        return;
      }
    }
  }

  function SelectComponent() {
    if(checkUser()) {
      return (
        <View
          style={{
            flex: 0.33,
            backgroundColor: 'white',
            alignSelf: 'flex-end',
            justifyContent: 'center',
            margin: 10,
            padding: 3,
            borderRadius: 10,
          }}>
          <UpdateProfileButton />
        </View>
      )
    } else {
      return (
        <View
          style={{
            flex: 0.33,
            backgroundColor: 'white',
            alignSelf: 'flex-start',
            justifyContent: 'center',
            margin: 10,
            padding: 3,
            borderRadius: 10,
          }}>
          <Text>Follow User</Text>
        </View>
      )
    }

  }
  return (
    <>
      {/* TOP HALF */}
      <View style={{ flex: 0.5, backgroundColor: 'white', padding: 10 }}>
        <View
          style={{
            flex: 0.5,
            backgroundColor: 'lightgrey',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}>
          <View
            style={{
              flex: 0.5,
              backgroundColor: 'lightgrey',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}>
            <Text style={{ margin: 10 }}>SEARCH</Text>
          </View>
        </View>

        <View
          style={{
            flex: 0.5,
            backgroundColor: 'dimgrey',
            justifyContent: 'flex-end',
            alignItems: 'center',
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
          }}>
          <Text
            testID='name-textbox'
            style={{
              color: 'white',
            }}>{`${currentUser?.profile?.firstName ?? ''} ${currentUser?.profile?.lastName ?? ''}`}</Text>
          <Text
            testID='email-textbox'
            style={{
              color: 'white',
            }}>{`${currentUser?.profile?.email ?? 'Profile Deleted'}`}</Text>
          <Image
            resizeMode='center'
            style={{
              flex: 1,
              height: Dimensions.get('window').height / 4,
              width: Dimensions.get('window').width / 4,
              alignSelf: 'center',
              zIndex: 10,
              position: 'absolute',
              top: -Dimensions.get('window').height / 8,
              borderRadius: 100
            }}
            source={require("../../.././assets/favicon.png")}></Image>
            <SelectComponent/>
        </View>
        
      </View>

      {/* BOTTOM HALF */}
      <View style={{ flex: 0.5, backgroundColor: 'white', padding: 10 }}>
        <ViewPostsOrFollowers />
      </View>
    </>
  );
}
