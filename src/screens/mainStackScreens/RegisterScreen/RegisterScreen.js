import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import * as ImagePicker from "expo-image-picker";

import { useValidation } from "react-native-form-validator";

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

export const RegisterScreen = ({ navigation }) => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [avatar, setAvatar] = useState(null);

  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const [isShowPassword, setIsShowPassword] = useState(true);

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

    validate({
      login: { minlength: 3, maxlength: 7, required: true },
      email: { email: true, required: true },
      password: { password: true, minlength: 6, required: true },
    });

    dispatch(authSignUpUser({ login, email, password, avatar }));

    setLogin("");
    setEmail("");
    setPassword("");
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const { validate, isFieldInError, getErrorsInField, getErrorMessages } =
    useValidation({
      state: { login, email, password },
    });

  const showPassword = () => {
    if (isShowPassword) {
      return setIsShowPassword(false);
    }
    setIsShowPassword(true);
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
                  value={login}
                  onChangeText={(value) => setLogin(value)}
                />
                {isFieldInError("login") &&
                  getErrorsInField("login").map((errorMessage, indx) => (
                    <Text style={{ color: "red", marginTop: 5 }} key={indx}>
                      {errorMessage}
                    </Text>
                  ))}
              </View>
              <View style={{ marginTop: 16 }}>
                <TextInput
                  style={styles.input}
                  placeholder={"Адрес электронной почты"}
                  placeholderTextColor={"#BDBDBD"}
                  onFocus={() => setIsShowKeyboard(true)}
                  value={email}
                  onChangeText={(value) => setEmail(value)}
                />
                {isFieldInError("email") &&
                  getErrorsInField("email").map((errorMessage, indx) => (
                    <Text style={{ color: "red", marginTop: 5 }} key={indx}>
                      {errorMessage}
                    </Text>
                  ))}
              </View>
              <View style={{ marginTop: 16 }}>
                <TextInput
                  style={styles.input}
                  secureTextEntry={isShowPassword ? true : false}
                  placeholder={"Пароль"}
                  placeholderTextColor={"#BDBDBD"}
                  onFocus={() => setIsShowKeyboard(true)}
                  value={password}
                  onChangeText={(value) => setPassword(value)}
                />
                <TouchableOpacity
                  style={styles.showPasswordContainer}
                  onPress={showPassword}
                >
                  <Text style={styles.showPassword}>Показать</Text>
                </TouchableOpacity>
                {isFieldInError("password") &&
                  getErrorsInField("password").map((errorMessage, indx) => (
                    <Text style={{ color: "red", marginTop: 5 }} key={indx}>
                      {errorMessage}
                    </Text>
                  ))}
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
