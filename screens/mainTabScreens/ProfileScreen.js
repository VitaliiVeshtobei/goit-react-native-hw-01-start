import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

import { Feather } from "@expo/vector-icons";

import db from "../../firebase/config";

const ProfileScreen = ({ navigation }) => {
  const [userPosts, setUserPosts] = useState([]);
  const { userId, login } = useSelector((state) => state.auth);

  useEffect(() => {
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
        source={require("../../assets/images/photoBg.jpg")}
      >
        <View style={styles.profileContainer}>
          <View style={styles.photo}>
            <Image
              style={styles.add}
              source={require("../../assets/images/add.png")}
            />
          </View>
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>{login}</Text>
          </View>
          <View style={styles.postsContainer}>
            <FlatList
              data={userPosts}
              keyExtractor={(item, indx) => indx.toString()}
              renderItem={({ item }) => (
                <View style={styles.postContainer}>
                  <Image
                    source={{ uri: item.photo }}
                    style={styles.imagePost}
                  />
                  <Text style={styles.imageName}>{item.namePhoto}</Text>
                  <View style={styles.detailsContainer}>
                    <TouchableOpacity
                      style={styles.commentContainer}
                      onPress={() => {
                        navigation.navigate("Comments", { item });
                      }}
                    >
                      <Feather
                        name="message-circle"
                        size={24}
                        color="#BDBDBD"
                      />
                      <Text style={styles.commentText}>0</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.locationContainer}
                      onPress={() => {
                        navigation.navigate("Map", { item });
                      }}
                    >
                      <Feather name="map-pin" size={24} color="#BDBDBD" />
                      <Text style={styles.locationText}>Location</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  loginContainer: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 180,

    // textAlign: "center",
  },
  loginText: { fontFamily: "Roboto-Regular", fontSize: 30 },
  profileContainer: {
    flex: 1,
    justifyContent: "center",
    marginTop: 147,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#fff",
  },
  postsContainer: {
    marginTop: 30,
  },
  photo: {
    position: "absolute",
    left: 150,
    top: -60,
    backgroundColor: "#F6F6F6",

    borderRadius: 16,

    width: 120,
    height: 120,
  },
  add: {
    width: 30,
    height: 30,
    left: 105,
    top: 75,
  },
  postContainer: {
    marginHorizontal: 16,
    marginTop: 32,
  },
  imagePost: {
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

export default ProfileScreen;
