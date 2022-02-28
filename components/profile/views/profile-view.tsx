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
export default function ProfileView(props: { route: any }) {
  const {pid} = props.route.params;
  const tempUser: User = useSelector((state: User) => state);
  const [currentUser, setCurrentUser] = useState<User>(tempUser);
  
  function checkUser(): boolean {
    return tempUser?.profile?.pid === pid; 
  }
  
  useEffect(() => {
    httpSetUser()
  }, []);

  async function httpSetUser() {  

    //if user is the logged in user
    if(checkUser()) {
      
      setCurrentUser(tempUser);
      return;
    } else {

        //otherwise, get the other user's profile
        try {
            const response: AxiosResponse = await axios.get(`${firebaseEndpoint}profile/${pid}.json`);
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
            backgroundColor: 'white',
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
    <View style={{height:'100%', width:'100%'}}>
      {/* TOP HALF */}
      <View style={{ flex: 0.3, backgroundColor: 'white', padding: 10 }}>
        <View
          style={{
            flex: 0.5,
            backgroundColor: '#B9B9BA',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}>
          <View
            style={{
              flex: 0.5,
              backgroundColor: '#B9B9BA',
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
            backgroundColor: '#474C55',
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
      <View style={{ flex: 0.7, backgroundColor: 'white', padding: 10 }}>
        <ViewPostsOrFollowers />
      </View>
    </View>
  );
}
