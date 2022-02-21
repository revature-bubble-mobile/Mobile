import { StatusBar } from 'expo-status-bar';
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
import { Provider, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Profile from './dtos/profile';

const Drawer = createDrawerNavigator();

let verification = false;

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const storedProfile = await AsyncStorageLib.getItem("profile");
      if (storedProfile) {
        const profile: Profile = JSON.parse(storedProfile);
        const setUser = actions.setUser(profile);
        dispatch(setUser);
        verification = profile.verification ?? false;
      }
    })();
  }, [dispatch]);
  return (<>
    {!verification ? <LoginView /> :
      <SafeAreaProvider>
        <ThemeProvider>
          <Provider store={store}>
            <NavigationContainer>
              <Drawer.Navigator>
                <Drawer.Screen name="Home" component={HomeView} />
                <Drawer.Screen name="Profile" component={ProfileView} />
              </Drawer.Navigator>
            </NavigationContainer>
            <StatusBar style="auto" />
          </Provider>
        </ThemeProvider>
      </SafeAreaProvider>
    }
  </>);
}
