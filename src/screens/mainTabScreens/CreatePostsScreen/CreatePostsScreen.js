import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
  TextInput,
  Keyboard,
  Image,
} from "react-native";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import * as LocationGeocodedAddress from "expo-location";

import * as ImagePicker from "expo-image-picker";

import { Feather, AntDesign } from "@expo/vector-icons";

import { styles } from "./CreatePostsScreenStyled";

import db from "../../../firebase/config";

const CreatePostsScreen = ({ navigation }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [namePhoto, setNamePhoto] = useState("");
  const [location, setLocation] = useState("");
  const [locationCity, setLocationCity] = useState("");
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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const resetPost = () => {
    setLocation("");
    setPhoto(null);
    setNamePhoto("");
    setLocation("");
    setLocationCity("");
  };

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    let location = await Location.getCurrentPositionAsync({});
    await setLocation(location);
    setPhoto(photo.uri);
    locationGeocodedAddress();
  };

  const locationGeocodedAddress = async () => {
    if (!location) return;
    let locationGeocodedAddress =
      await LocationGeocodedAddress.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

    setLocationCity(locationGeocodedAddress[0].city);
  };

  const uploadPhotoToServer = async () => {
    const response = await fetch(photo);
    const file = await response.blob();
    console.log(file);
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
    const createPost = await db.firestore().collection("posts").add({
      photo,
      namePhoto,
      location: location.coords,
      userId,
      login,
      locationCity,
    });
  };

  const publishPost = async () => {
    uploadPostToServer();

    navigation.navigate("DefaultScreen");
    setPhoto(null);
    setNamePhoto("");
    setLocation("");
    setLocationCity("");
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

        <TouchableOpacity
          onPress={pickImage}
          style={styles.confirmFotoContainer}
        >
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
              onFocus={() => {
                setIsShowKeyboard(true);
              }}
              value={locationCity ? locationCity : ""}
              onChangeText={setLocationCity}
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
          <AntDesign
            name="delete"
            size={24}
            color="black"
            onPress={resetPost}
          />
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CreatePostsScreen;
