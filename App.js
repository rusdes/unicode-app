import * as React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Image,
  Button,
} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import ContactsScreen from './App/screens/contact/contactScreen';
import WeatherScreen from './App/screens/weather/weatherScreen';
import ProfileScreen from './App/screens/profile/profileScreen';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Profile Page">
          <Drawer.Screen name="Profile Page" component={ProfileScreen} />
          <Drawer.Screen name="Phone Book" component={ContactsScreen} />
          <Drawer.Screen name="Weather" component={WeatherScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0dcdc',
  },
});
