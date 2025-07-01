// app/assets/screens/MainNav.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DiscoverScreen from './DiscoverScreen';
import EventsScreen from './EventsScreen';
import MapScreen from './MapScreen';
import AccountScreen from './AccountScreen';
import ConnectScreen from './ConnectScreen';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const MainNav = ({ route }) => {
  const { username } = route.params || {};

  return (
    
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
            } else if (route.name === 'Account') {
              iconName = 'account';
              IconComponent = MaterialCommunityIcons;
            } else if (route.name === 'Discover') {
              iconName = 'globe-outline';
              IconComponent = Ionicons;
            } else if (route.name === 'Connect') {
              iconName = 'people-outline';
              IconComponent = Ionicons;
            }

            return <IconComponent name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}
      >
        <Tab.Screen name="Discover" component={DiscoverScreen} />
        <Tab.Screen name="Events" component={EventsScreen} />
        <Tab.Screen name="Connect" component={ConnectScreen} />
        <Tab.Screen
          name="Account"
          children={() => <AccountScreen username={username} />}
        />
        <Tab.Screen name="Map" component={MapScreen} />
      </Tab.Navigator>
  );
};

export default MainNav;