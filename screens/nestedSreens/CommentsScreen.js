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

import { Feather } from "@expo/vector-icons";

import db from "../../firebase/config";

const CommentsScreen = ({ route }) => {
  const photo = route.params.item.photo;
  const postId = route.params.item.id;
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);

  const { login } = useSelector((state) => state.auth);

  useEffect(() => {
    getAllPosts();
  }, []);

  const createPost = async () => {
    if (!comment) return;
    const date = new Date().toLocaleString();
    db.firestore()
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .add({ comment, login, date });
    setComment("");
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
            <Text style={styles.imageName}>{item.login}</Text>
            <View style={styles.commentTextContainer}>
              <Text style={styles.comment}>{item.comment}</Text>
              <Text style={styles.commentDate}>{item.date}</Text>
            </View>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputText}
          onChangeText={setComment}
          value={comment}
          placeholder={"Комментировать..."}
          placeholderTextColor={"#BDBDBD"}
        />
        <TouchableOpacity style={styles.btn}>
          <Text onPress={createPost}>
            <Feather name="send" size={24} color="#FFFFFF" />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  commentContainer: {
    flexDirection: "row",

    alignItems: "baseline",
    marginTop: 32,
  },
  image: {
    width: "100%",
    height: 240,
    borderRadius: 8,
  },
  commentTextContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderRadius: 6,
    marginLeft: 8,
    padding: 16,
  },
  comment: {
    fontFamily: "Roboto-Medium",
    fontSize: 13,
    color: "#212121",
  },
  commentDate: {
    fontFamily: "Roboto-Medium",
    fontSize: 10,
    color: "#BDBDBD",
    marginTop: 8,
  },
  inputContainer: { position: "relative" },
  inputText: {
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderColor: "#E8E8E8",
    borderRadius: 100,
    padding: 16,
    height: 50,
  },

  btn: {
    position: "absolute",
    top: 8,
    right: 14,
    width: 34,
    height: 34,
    borderRadius: 100,

    backgroundColor: "#FF6C00",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CommentsScreen;
