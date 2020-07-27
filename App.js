import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from './screens/Home';
import PrayerList from './screens/PrayerList';
import MyGroups from './screens/MyGroups';
import CreatePrayer from './screens/CreatePrayer';
import Settings from './screens/Settings';
import Signup from './screens/Signup';
import Login from './screens/Login';

import Firebase from './lib/firebase';
import { decode, encode } from 'base-64'

const DrawerStack = createDrawerNavigator();
const AuthenticationStack = createStackNavigator();

global.crypto = require("@firebase/firestore");
global.crypto.getRandomValues = byteArray => { for (let i = 0; i < byteArray.length; i++) { byteArray[i] = Math.floor(256 * Math.random()); } }

if (!global.btoa) { global.btoa = encode; }
if (!global.atob) { global.atob = decode; }

export default function App() {
  const [user, setUser] = useState(true);
  useEffect(() => {
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);
  return (
    <NavigationContainer>
      {user && (
        <DrawerStack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="Home"
            drawerStyle={{
              backgroundColor: '#2c5282',
              width: 260,
            }}
            drawerContentOptions={{
              activeTintColor: '#00a8ff',
              itemStyle: { marginVertical: 10 },
              labelStyle: { fontSize: 18, color: '#00a8ff' },
            }}>
          <DrawerStack.Screen name="Home" component={Home} />
          <DrawerStack.Screen name="Create Prayer" component={CreatePrayer} />
          <DrawerStack.Screen name="Prayer List" component={PrayerList} />
          <DrawerStack.Screen name="My Groups" component={MyGroups} />
          <DrawerStack.Screen name="Settings" component={Settings} />
        </DrawerStack.Navigator>
      )}
      {!user && (
        <AuthenticationStack.Navigator screenOptions={{ headerShown: false }}>
          <AuthenticationStack.Screen name="Signup" component={Signup} />
          <AuthenticationStack.Screen name="Login" component={Login} />
        </AuthenticationStack.Navigator>
      )}
    </NavigationContainer>
  );
}