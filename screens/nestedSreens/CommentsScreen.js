import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";

import db from "../../firebase/config";

const CommentsScreen = ({ route }) => {
  const photo = route.params.item.photo;
  const postId = route.params.item.id;
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const { login } = useSelector((state) => state.auth);
  console.log(route.params);

  useEffect(() => {
    getAllPosts();
  }, []);

  const createPost = async () => {
    db.firestore()
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .add({ comment, login });
  };

  const getAllPosts = async () => {
    db.firestore()
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .onSnapshot((data) =>
        setAllComments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
  };

  return (
    <View style={styles.container}>
      <View style={styles.commentContainer}>
        <Image source={{ uri: photo }} style={styles.image} />
      </View>
      <FlatList
        data={allComments}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View style={styles.commentContainer}>
            <Text style={styles.imageName}>{login}</Text>
            <Text style={styles.imageName}>{item.comment}</Text>
          </View>
        )}
      />
      <View>
        <TextInput onChangeText={setComment} />
        <TouchableOpacity>
          <Text onPress={createPost}>ADD</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  commentContainer: {
    marginTop: 32,
  },
  image: {
    width: "100%",
    height: 240,
    borderRadius: 8,
  },
});

export default CommentsScreen;
