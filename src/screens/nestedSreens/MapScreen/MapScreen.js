import React from "react";
import { View } from "react-native";
import MapView, { Marker } from "react-native-maps";

import { styles } from "./MapScreenStyled";

const MapScreen = ({ route }) => {
  const { latitude, longitude } = route.params.item.location;

  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1 }}
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
    </View>
  );
};

export default MapScreen;
