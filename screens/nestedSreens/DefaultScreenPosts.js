import React, { useState, useEffect } from "react";
import db from "../../firebase/config";

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";

import { Feather } from "@expo/vector-icons";

const PostsScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [numberOfComments, setNumberOfComments] = useState(null);
  console.log(posts);

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    await db
      .firestore()
      .collection("posts")
      .onSnapshot((data) => {
        setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            <Image source={{ uri: item.photo }} style={styles.image} />
            <Text style={styles.imageName}>{item.namePhoto}</Text>
            <View style={styles.detailsContainer}>
              <TouchableOpacity
                style={styles.commentContainer}
                onPress={() => {
                  navigation.navigate("Comments", { item });
                }}
              >
                <Feather name="message-circle" size={24} color="#BDBDBD" />
                <Text style={styles.commentText}>{0}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.locationContainer}
                onPress={() => {
                  navigation.navigate("Map", { item });
                }}
              >
                <Feather name="map-pin" size={24} color="#BDBDBD" />
                <Text style={styles.locationText}>{item.locationCity}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",

    marginHorizontal: 16,
  },
  postContainer: {
    marginTop: 32,
  },
  image: {
    width: "100%",
    height: 240,
    borderRadius: 8,
  },
  imageName: {
    color: "#212121",
    fontFamily: "Roboto-Medium",
    fontWeight: 500,
    marginTop: 8,
  },
  detailsContainer: { flexDirection: "row", alignItems: "baseline" },
  commentContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  commentText: {
    marginLeft: 9,
    color: "#BDBDBD",
  },

  locationContainer: {
    marginLeft: 50,
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    marginLeft: 8,
  },
});

export default PostsScreen;
