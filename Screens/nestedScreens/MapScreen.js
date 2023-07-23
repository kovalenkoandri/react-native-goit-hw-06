import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = ({ route }) => {
  
  const latitude = route.params.route.params.coord.coords.latitude;
  const longitude = route.params.route.params.coord.coords.longitude;
  return (
    <View style={styles.container}>
      {route.params.route.params.coord.coords.latitude ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: 0.001,
            longitudeDelta: 0.006,
          }}
        >
          <Marker
            coordinate={{
              latitude,
              longitude,
            }}
            title="travel photo"
          />
        </MapView>
      ) : (
        <Text>no coordinates</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default MapScreen;
