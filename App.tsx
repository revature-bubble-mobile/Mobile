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
import { CreatePost } from './components/create-post/create-post';

const Drawer = createDrawerNavigator();

const verification = false;

export default function App() {
  return (<>
    {verification ? <LoginView /> :
      <SafeAreaProvider>
        <ThemeProvider>
          <NavigationContainer>
            <Drawer.Navigator>
              <Drawer.Screen name="Home" component={HomeView} />
              <Drawer.Screen name="Profile" component={ProfileView} />
              <Drawer.Screen name="CreatePost" component={CreatePost} />
            </Drawer.Navigator>
          </NavigationContainer>
          <StatusBar style="auto" />
        </ThemeProvider>
      </SafeAreaProvider>
    }
  </>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
