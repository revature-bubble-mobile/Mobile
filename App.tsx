import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ThemeProvider} from 'react-native-elements';
import LoginView from './components/login/login-view';
import HomeView from './components/home/home-view';
import ProfileView from './components/profile/profile-view';
import { NavigationContainer } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

const verification = false;

export default function App() {
  return (<>
    {verification ? <LoginView /> :
    <SafeAreaProvider>
      <ThemeProvider>
        <NavigationContainer>
          <Drawer.Navigator>
            <Drawer.Screen name="Home" component={HomeView}/>
            <Drawer.Screen name="Profile" component={ProfileView}/>
          </Drawer.Navigator>
        </NavigationContainer>
        <StatusBar style="auto" />
      </ThemeProvider>
    </SafeAreaProvider>
    }
    </>);
}
