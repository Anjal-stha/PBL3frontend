// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './app/assets/screens/LoginScreen';
import MainNav from './app/assets/screens/MainNav';
import DetailsScreen from './app/assets/screens/DetailsScreen';
import AddFriendsScreen from './app/assets/screens/AddFriendsScreen';
import SignInScreen from './app/assets/screens/SignInScreen'
import ChatScreen from './app/assets/screens/ChatScreen';
import FormScreen from './app/assets/screens/FromScreen';

import { FriendsProvider } from './app/assets/screens/FriendsContext'; // <--- Import FriendsProvider here

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* Wrap the entire Stack.Navigator with FriendsProvider */}
      <FriendsProvider>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SingIn" component={SignInScreen} />
          <Stack.Screen name="MainTabs" component={MainNav} />
          <Stack.Screen name="Details" component={DetailsScreen} />
          <Stack.Screen name="SurveyForm" component={FormScreen} /> 
          <Stack.Screen name="AddFriends" component={AddFriendsScreen} />
          <Stack.Screen name="ChatScreen" component={ChatScreen} />
        </Stack.Navigator>
      </FriendsProvider>
    </NavigationContainer>
  );
}
