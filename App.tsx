import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from 'react-native-elements';
import LoginView from './components/login/login-view';
import HomeView from './components/home/home-view';
import ProfileView from './components/profile/profile-view';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorageLib from '@react-native-async-storage/async-storage';
import { store, actions } from './store';
import { useEffect } from 'react';
import Profile from './dtos/profile';
import CommentView from './components/comment/comment-view';
import Comment from './dtos/comment';
import Post from './dtos/post';

const Drawer = createDrawerNavigator();

let verification = false;

const testPost: Post = {psid: "test-post", pid: "test-profile", body: "Test Message", datePosted: new Date()}
const testComments: Comment[] = [
    {cid: "123", pid: "test-profile", psid: "test-post", message: "Test Comment 1", dateCreated: new Date()},
    {cid: "456", pid: "test-profile", psid: "test-post", message: "Test Comment 2", dateCreated: new Date()},
    {cid: "789", pid: "test-profile", psid: "test-post", message: "Test Reply 1", dateCreated: new Date(), parentComment: "123"},
    {cid: "222", pid: "test-profile", psid: "test-post", message: "Test Reply 2", dateCreated: new Date(), parentComment: "123"}
]

export default function App() {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   (async () => {
  //     const storedProfile = await AsyncStorageLib.getItem("profile");
  //     if (storedProfile) {
  //       const profile:Profile = JSON.parse(storedProfile);
  //       const setUser = actions.setUser(profile);
  //       dispatch(setUser);
  //       verification = profile.verification ?? false;
  //     }
  //   })();
  // }, [dispatch]);
  return (<View style={styles.container}>
            <CommentView post={testPost} updatePost={()=>{}}/>
            <StatusBar style="auto" />
  </View>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center'
  },
});
