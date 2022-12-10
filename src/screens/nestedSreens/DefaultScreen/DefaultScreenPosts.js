import React, { useState, useEffect } from "react";
import db from "../../../firebase/config";

import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";

import { Feather } from "@expo/vector-icons";

import { styles } from "./DefaultScreenStyled";

const PostsScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);

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
                <Text style={styles.commentText}>
                  {item.number ? item.number : 0}
                </Text>
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

export default PostsScreen;
