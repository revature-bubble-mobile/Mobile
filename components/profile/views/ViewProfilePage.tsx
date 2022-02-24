import { View, Text, Image, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { User } from '../../../store';
import UpdateProfileButton from '../interactive/UpdateProfileButton';
import ViewPostsOrFollowers from './ViewPostsOrFollowers';

export default function ViewProfilePage() {
  const currentUser: User = useSelector((state: User) => state);

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
            }}>{`${currentUser.profile.firstName} ${currentUser.profile.lastName}`}</Text>
          <Text
            testID='email-textbox'
            style={{
              color: 'white',
            }}>{`${currentUser.profile.email}`}</Text>
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
            }}
            source={require('./circle.jpg')}></Image>

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
        </View>
      </View>

      {/* BOTTOM HALF */}
      <View style={{ flex: 0.5, backgroundColor: 'white', padding: 10 }}>
        <ViewPostsOrFollowers />
      </View>
    </>
  );
}
