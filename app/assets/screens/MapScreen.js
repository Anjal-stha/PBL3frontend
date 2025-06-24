import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';


import { FontAwesome5 } from '@expo/vector-icons';

export default function MapScreen({ navigation }) {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);
    })();
  }, []);

  return (
    <View style={styles.container}>
      {location ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          showsUserLocation={true}
        >
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="You are here"
            pinColor="red"
          />
        </MapView>
      ) : (
        <Text style={styles.loadingText}>Loading map...</Text>
      )}

      {/* Bottom Navigation */}
      {/* <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate('Discover')}>
          <Ionicons name="globe-outline" size={24} color="#000" />
          <Text style={styles.navLabel}>Discover</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Events')}>
          <Ionicons name="sparkles" size={28} color="#000" />
          <Text style={styles.navLabel}>Events</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Connect')}>
          <Ionicons name="people-outline" size={24} color="#000" />
          <Text style={styles.navLabel}>Connect</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Account')}>
          <Ionicons name="person-circle-outline" size={24} color="#000" />
          <Text style={styles.navLabel}>Account</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Map')}>
          <Ionicons name="map-outline" size={24} color="#007BFF" />
          <Text style={[styles.navLabel,styles.activeLabel]}>Map</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
}

const NavItem = ({ icon, label, active, onPress }) => (
  <TouchableOpacity style={styles.navItem} onPress={onPress}>
    <FontAwesome5
      name={icon}
      size={active ? 26 : 20}
      color={active ? '#007AFF' : '#333'}
    />
    <Text style={[styles.navLabel, active && { color: '#007AFF', fontWeight: 'bold' }]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  loadingText: {
    flex: 1,
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  navLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  activeLabel: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
});
