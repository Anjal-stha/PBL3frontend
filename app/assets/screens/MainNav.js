import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DiscoverScreen from './DiscoverScreen';
import EventsScreen from './EventsScreen';
import MapScreen from './MapScreen';
import AccountScreen from './AccountScreen'; // Import the new AccountScreen
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

// MainNav now receives 'route' prop to get parameters from LoginScreen
const MainNav = ({ route }) => {
  // Extract username from MainNav's route.params
  // This username was passed from LoginScreen when navigating to MainTabs
  const { username } = route.params || {}; // Safely get username, default to empty object

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
        headerShown: false, // Hide header for all tab screens
      })}
    >
      <Tab.Screen name="Discover" component={DiscoverScreen} />
      <Tab.Screen name="Events" component={EventsScreen} />
      <Tab.Screen name="Connect" component={EventsScreen} />
      {/* Pass the username as initialParams to the Account screen */}
      <Tab.Screen
        name="Account"
        // Pass a function to component prop to inject additional props
        // This ensures AccountScreen gets the username from MainNav's route
        children={() => <AccountScreen username={username} />}
      />
      <Tab.Screen name="Map" component={MapScreen} />
    </Tab.Navigator>
  );
};

export default MainNav;