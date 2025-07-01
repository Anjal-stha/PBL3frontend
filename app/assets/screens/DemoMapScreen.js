import React, { useState } from 'react';
import {Marker} from 'react-native-maps';
import MapView from 'react-native-maps';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';






export default function DemoMapScreen(){
    const [region, setRegion] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    
    return (
        <View style={styles.container}> 
         <MapView
         style={styles.map}
   
         region={this.region}
         onRegionChange={setRegion}
 >
    <Marker 
    coordinate={{latitude: 37.78825, longitude: -122.4324}}
    />
 </MapView>
        </View>
     );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      flex: 1,
    },
    
  });
  
