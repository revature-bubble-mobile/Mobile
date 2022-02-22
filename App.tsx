import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from 'react-native-elements';
import LoginView from './components/login/login-view';
import HomeView from './components/home/home-view';
import ProfileView from './components/profile/profile-view';
import { NavigationContainer } from '@react-navigation/native';
import { actions, store } from './store';
import { Provider } from 'react-redux';
import { useEffect, useState } from 'react';
import AsyncStorageLib from '@react-native-async-storage/async-storage';
import Profile from './dtos/profile';
import CommentView from './components/comment/comment-view';
import Comment from './dtos/comment';
import Post from './dtos/post';

const Drawer = createDrawerNavigator();

export default function App() {

  const [verification, setVerification] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const storedProfile = await AsyncStorageLib.getItem("profile");
      if (storedProfile) {
        const profile:Profile = JSON.parse(storedProfile);
        const setUser = actions.setUser(profile);
        store.dispatch(setUser);
        setVerification(profile.verification ?? false);
      }
      setVerification(true);
    })();
  }, [verification]);

return (<Provider store={store}>
  <ThemeProvider>
    {!verification ? <LoginView /> :
      <SafeAreaProvider>
        <NavigationContainer>
          <Drawer.Navigator>
            <Drawer.Screen name="Home" component={HomeView} />
            <Drawer.Screen name="Profile" component={ProfileView} />
          </Drawer.Navigator>
        </NavigationContainer>
        <StatusBar style="auto" />
      </SafeAreaProvider>
    }
  </ThemeProvider>
</Provider>)}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center'
  },
});
