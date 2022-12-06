import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Text,
  TextInput,
  Keyboard,
  Image,
} from "react-native";
import { Camera } from "expo-camera";
import * as Location from "expo-location";

import { Feather, AntDesign } from "@expo/vector-icons";

import db from "../../firebase/config";

const CreatePostsScreen = ({ navigation }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [namePhoto, setNamePhoto] = useState("");
  const [location, setLocation] = useState("");
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [statusLocation, setStatusLocation] = useState(false);
  const [statusPhoto, setStatusPhoto] = useState(false);

  const [errorMsg, setErrorMsg] = useState(null);

  const { userId, login } = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      if (!statusPhoto) {
        let { status } = await Camera.requestCameraPermissionsAsync();

        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }
        setStatusPhoto(true);
      }
      if (!statusLocation) {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }
        setStatusLocation(true);
      }
    })();
  }, []);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    setPhoto(photo.uri);
  };

  const uploadPhotoToServer = async () => {
    const response = await fetch(photo);
    const file = await response.blob();

    const uniquePostId = Date.now().toString();

    await db.storage().ref(`postImage/${uniquePostId}`).put(file);

    const processedPhoto = await db
      .storage()
      .ref("postImage")
      .child(uniquePostId)
      .getDownloadURL();

    return processedPhoto;
  };

  const uploadPostToServer = async () => {
    const photo = await uploadPhotoToServer();
    const createPost = await db
      .firestore()
      .collection("posts")
      .add({ photo, namePhoto, location: location.coords, userId, login });
  };

  const publishPost = async () => {
    uploadPostToServer();

    navigation.navigate("DefaultScreen");
    setPhoto(null);
    setNamePhoto("");
    setLocation("");
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        {photo ? (
          <Image source={{ uri: photo }} style={styles.camera} />
        ) : (
          <Camera style={styles.camera} ref={setCamera}>
            {statusPhoto && (
              <TouchableOpacity style={styles.btnContainer} onPress={takePhoto}>
                <Feather name="camera" size={24} color="white" />
              </TouchableOpacity>
            )}
          </Camera>
        )}

        <TouchableOpacity style={styles.confirmFotoContainer}>
          {!photo ? (
            <Text style={styles.confitmFotoText}>Загрузите фото</Text>
          ) : (
            <Text style={styles.confitmFotoText}>Редактировать фото</Text>
          )}
        </TouchableOpacity>
        <View style={styles.inputsContainer}>
          <View style={{ marginTop: 16 }}>
            <TextInput
              style={styles.input}
              placeholder={"Название..."}
              placeholderTextColor={"#BDBDBD"}
              onFocus={() => setIsShowKeyboard(true)}
              value={namePhoto}
              onChangeText={setNamePhoto}
            />
          </View>
          <View style={{ marginTop: 16 }}>
            <TextInput
              style={styles.input}
              placeholder={"Местность..."}
              placeholderTextColor={"#BDBDBD"}
              onFocus={() => setIsShowKeyboard(true)}
              value={location}
              onChangeText={setLocation}
            />
          </View>
        </View>
        {!photo ? (
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.publishBtnContainer}
            onPress={publishPost}
          >
            <Text style={styles.publishText}>Опубликовать</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              ...styles.publishBtnContainer,
              backgroundColor: "#FF6C00",
            }}
            onPress={publishPost}
          >
            <Text style={styles.publishText}>Опубликовать</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.deletehBtnContainer}
          // onPress={}
        >
          <AntDesign name="delete" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 32,
    marginHorizontal: 16,
  },
  camera: {
    height: 300,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  btnContainer: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  confirmFotoContainer: { marginTop: 8 },
  confitmFotoText: {
    fontFamily: "Roboto-Medium",
    fontWeight: 400,
    color: "#BDBDBD",
  },
  inputsContainer: {
    marginTop: 48,
  },
  input: {
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  publishBtnContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
    backgroundColor: "#F6F6F6",
    paddingVertical: 16,
    borderRadius: 100,
  },
  publishText: {
    color: "#BDBDBD",
  },
  deletehBtnContainer: {
    marginTop: 100,
    marginLeft: "auto",
    marginRight: "auto",
    width: 70,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F6F6F6",

    borderRadius: 20,
  },
});

export default CreatePostsScreen;
