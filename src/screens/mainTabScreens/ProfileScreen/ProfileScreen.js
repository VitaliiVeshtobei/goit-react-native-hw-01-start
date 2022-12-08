import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  Text,
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

import { authStateCahngeUser } from "../../../redux/auth/authOperations";

import db from "../../../firebase/config";

import { Feather } from "@expo/vector-icons";
import { styles } from "./ProfileScreenStyled";

const ProfileScreen = ({ navigation }) => {
  const [userPosts, setUserPosts] = useState([]);
  const { userId, login, avatar } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateCahngeUser());
    getUserPosts();
  }, []);

  const getUserPosts = async () => {
    await db
      .firestore()
      .collection("posts")
      .where("userId", "==", userId)
      .onSnapshot((data) =>
        setUserPosts(data.docs.map((doc) => ({ ...doc.data() })))
      );
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require("../../../../assets/images/photoBg.jpg")}
      >
        <View style={styles.profileContainer}>
          <View style={styles.photo}>
            {avatar ? (
              <Image style={styles.avatar} source={{ uri: avatar }} />
            ) : (
              <Image
                style={styles.add}
                source={require("../../../../assets/images/add.png")}
              />
            )}
          </View>
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>{login}</Text>
          </View>

          <FlatList
            data={userPosts}
            keyExtractor={(item, indx) => indx.toString()}
            renderItem={({ item }) => (
              <View style={styles.postContainer}>
                <Image source={{ uri: item.photo }} style={styles.imagePost} />
                <Text style={styles.imageName}>{item.namePhoto}</Text>
                <View style={styles.detailsContainer}>
                  <TouchableOpacity
                    style={styles.commentContainer}
                    onPress={() => {
                      navigation.navigate("Comments", { item });
                    }}
                  >
                    <Feather name="message-circle" size={24} color="#BDBDBD" />
                    <Text style={styles.commentText}>0</Text>
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
      </ImageBackground>
    </View>
  );
};

export default ProfileScreen;
