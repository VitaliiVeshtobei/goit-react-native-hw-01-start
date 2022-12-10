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

import * as ImagePicker from "expo-image-picker";

import { authStateCahngeUser } from "../../../redux/auth/authOperations";
import { updateUserProfile } from "../../../redux/auth/authReducer";

import db from "../../../firebase/config";

import { Feather } from "@expo/vector-icons";
import { styles } from "./ProfileScreenStyled";

const ProfileScreen = ({ navigation }) => {
  const [userPosts, setUserPosts] = useState([]);
  const { userId, login, avatar } = useSelector((state) => state.auth);
  const [avatarProfile, setAvatarProfile] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateCahngeUser());
    getUserPosts();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatarProfile(result.assets[0].uri);
      const user = await db.auth().currentUser;

      const { displayName, uid, photoURL } = await db.auth().currentUser;

      const response = await fetch(avatarProfile);
      const file = await response.blob();

      await db.storage().ref(`avatars/${userId}`).put(file);
      const processedAvatar = await db
        .storage()
        .ref("avatars")
        .child(userId)
        .getDownloadURL();

      await user.updateProfile({
        displayName: login,
        photoURL: processedAvatar,
      });

      const userUpdateProfile = {
        login: displayName,
        userId: userId,
        avatar: photoURL,
      };

      dispatch(updateUserProfile(userUpdateProfile));
    }
  };

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
              <TouchableOpacity onPress={pickImage}>
                <Image
                  style={styles.add}
                  source={require("../../../../assets/images/add.png")}
                />
              </TouchableOpacity>
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
