import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";

import { Feather } from "@expo/vector-icons";

import { styles } from "./CommentsStyled";

import db from "../../../firebase/config";

const CommentsScreen = ({ route }) => {
  const item = route.params.item;
  const photo = route.params.item.photo;
  const postId = route.params.item.id;

  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);

  const { login, avatar } = useSelector((state) => state.auth);

  useEffect(() => {
    getAllPosts();
  }, []);

  const createPost = async () => {
    if (!comment) return;

    const date = new Date().toLocaleString();
    await db
      .firestore()
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .add({ comment, login, date, avatar });
    await setComment("");

    db.firestore()
      .collection("posts")
      .doc(postId)
      .set({ ...item, number: allComments.length + 1 });
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
            <View style={styles.avatarContainer}>
              <Image style={styles.avatar} source={{ uri: item.avatar }} />
              <Text style={styles.login}>{item.login}</Text>
            </View>

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
        <TouchableOpacity style={styles.btn} onPress={createPost}>
          <Text>
            <Feather name="send" size={24} color="#FFFFFF" />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CommentsScreen;
