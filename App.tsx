import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, View } from 'react-native';
import 'react-native-gesture-handler';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Icon, ThemeProvider } from 'react-native-elements';
import LoginView from './components/login/login-view';
import HomeView from './components/home/home-view';
import ProfileView from './components/profile/profile-view';
import { NavigationContainer } from '@react-navigation/native';
import { actions, store } from './store';
import { Provider } from 'react-redux';
import { useEffect, useState } from 'react';
import AsyncStorageLib from '@react-native-async-storage/async-storage';
import Profile from './dtos/profile';
import { FontAwesome } from '@expo/vector-icons';
import DrawerHeader from './components/drawer/drawer-header';
import DrawerLogout from './components/drawer/drawer-logout';
import DrawerFooter from './components/drawer/drawer-footer';

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
    })();
  }, [verification]);

return (<Provider store={store}>
  <ThemeProvider>
    {verification ? <LoginView /> :
      <SafeAreaProvider>
        <NavigationContainer>
          <Drawer.Navigator initialRouteName='Home' drawerContent={props => {return(
            <DrawerContentScrollView {...props}>
              <DrawerHeader />
              <DrawerItemList {...props}/>
              <DrawerLogout setVerification={setVerification} />
              <DrawerFooter />
            </DrawerContentScrollView>
          )}}>
            <Drawer.Screen options={{drawerIcon:()=>{return(<FontAwesome name="home" size={30}/>)}}} name="Home" component={HomeView} />
            <Drawer.Screen options={{drawerIcon:()=>{return(<FontAwesome name="drivers-license-o" size={30}/>)}}} name="Profile" component={ProfileView} />
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
  },
});
