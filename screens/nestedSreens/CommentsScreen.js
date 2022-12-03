import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const CommentsScreen = ({ route }) => {
  const photo = route.params.item.photo;
  console.log(photo);
  return (
    <View style={styles.container}>
      <View style={styles.commentContainer}>
        <Image source={{ uri: photo }} style={styles.image} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    marginHorizontal: 16,
    // alignItems: "center",
  },
  commentContainer: {
    marginTop: 32,
    // marginBottom: 32,
  },
  image: {
    width: "100%",
    height: 240,
    borderRadius: 8,
  },
});

export default CommentsScreen;
