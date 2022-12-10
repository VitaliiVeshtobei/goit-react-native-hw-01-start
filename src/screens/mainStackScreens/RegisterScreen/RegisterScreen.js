import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import * as ImagePicker from "expo-image-picker";

import { authSignUpUser } from "../../../redux/auth/authOperations";

import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Image,
  ImageBackground,
} from "react-native";

import { styles } from "./RegisterScreenStyled";

const initialState = {
  login: "",
  email: "",
  password: "",
};

export const RegisterScreen = ({ navigation }) => {
  const [state, setState] = useState(initialState);
  const [avatar, setAvatar] = useState(null);

  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const dispatch = useDispatch();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const onSubmit = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();

    dispatch(authSignUpUser({ ...state, avatar }));
    setState(initialState);
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={require("../../../../assets/images/photoBg.jpg")}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View
              style={{
                ...styles.form,
                paddingBottom: isShowKeyboard ? 32 : 78,
              }}
            >
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
              <Text style={styles.title}>Регистрация</Text>

              <View>
                <TextInput
                  style={styles.input}
                  placeholder={"Логин"}
                  placeholderTextColor={"#BDBDBD"}
                  onFocus={() => setIsShowKeyboard(true)}
                  value={state.login}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, login: value }))
                  }
                />
              </View>
              <View style={{ marginTop: 16 }}>
                <TextInput
                  style={styles.input}
                  placeholder={"Адрес электронной почты"}
                  placeholderTextColor={"#BDBDBD"}
                  onFocus={() => setIsShowKeyboard(true)}
                  value={state.email}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, email: value }))
                  }
                />
              </View>
              <View style={{ marginTop: 16 }}>
                <TextInput
                  style={styles.input}
                  secureTextEntry={true}
                  placeholder={"Пароль"}
                  placeholderTextColor={"#BDBDBD"}
                  onFocus={() => setIsShowKeyboard(true)}
                  value={state.password}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, password: value }))
                  }
                />
                <Text style={styles.showPassword}>Показать</Text>
              </View>

              {!isShowKeyboard && (
                <View>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.button}
                    onPress={onSubmit}
                  >
                    <Text style={styles.buttonText}>Зарегистрироваться</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.goLoginContainer}
                    onPress={() => {
                      navigation.navigate("Login");
                    }}
                  >
                    <Text style={styles.goLoginText}>
                      Уже есть аккаунт? Войти
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};
