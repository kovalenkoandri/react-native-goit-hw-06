import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const MapScreen = ({ route }) => {
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  useEffect(() => {
    if (
      typeof route?.params?.longitude === 'number' &&
      typeof route?.params?.latitude === 'number'
    ) {
      setLatitude(route?.params?.latitude);
      setLongitude(route?.params?.longitude);
    }
  }, [route?.params?.longitude, route?.params?.latitude]);

  return (
    <View style={styles.container}>
      {latitude ? (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: 50.516339,
            longitude: 30.602185,
            // latitude,
            // longitude,
            latitudeDelta: 0.001,
            longitudeDelta: 0.006,
          }}
        >
          <Marker
            coordinate={{
              // latitude,
              // longitude,
              latitude: 50.516339,
              longitude: 30.602185,
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
