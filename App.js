// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import EventsScreen from './app/assets/screens/EventsScreen';
import MapScreen from './app/assets/screens/MapScreen';
import DiscoverScreen from './app/assets/screens/DiscoverScreen';
import LoginScreen from './app/assets/screens/LoginScreen';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
  screenOptions={({ route }) => ({
    tabBarIcon: ({ color, size }) => {
      let iconName;
      let IconComponent;

      if (route.name === 'Events') {
        iconName = 'calendar';
        IconComponent = FontAwesome;
      } else if (route.name === 'Map') {
        iconName = 'map-outline';
        IconComponent = Ionicons;
      } else if (route.name === 'Login') {
        iconName = 'user';
        IconComponent = FontAwesome;
      } else if (route.name === 'Account') {
        iconName = 'account';
        IconComponent = MaterialCommunityIcons;
      } else if (route.name === 'Discover') {
        iconName = 'globe-outline';
        IconComponent = Ionicons;
      }else if (route.name === 'Connect') {
        iconName = 'people-outline';
        IconComponent = Ionicons;
      }

      return <IconComponent name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: '#007AFF',
    tabBarInactiveTintColor: 'gray',
  })}
>
  <Tab.Screen name="Discover" component={DiscoverScreen} />
  <Tab.Screen name="Events" component={EventsScreen} />
  <Tab.Screen name="Map" component={MapScreen} />
  <Tab.Screen name="Connect" component={LoginScreen} />
  <Tab.Screen name="Account" component={EventsScreen} />

      </Tab.Navigator>

    </NavigationContainer>
  );
}
