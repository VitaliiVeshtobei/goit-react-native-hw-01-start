import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { authSignInUser } from "../../../redux/auth/authOperations";

import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  ImageBackground,
} from "react-native";

import { useValidation } from "react-native-form-validator";

import { styles } from "./LoginScreenStyled";

export const LoginScreen = ({ navigation }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(true);
  const dispatch = useDispatch();

  const onSubmit = () => {
    validate({
      email: { email: true, required: true },
      password: { password: true, minlength: 6, required: true },
    });
    dispatch(authSignInUser({ password, email }));
    setIsShowKeyboard(false);
    Keyboard.dismiss();

    setPassword("");
    setEmail("");
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const { validate, isFieldInError, getErrorsInField, getErrorMessages } =
    useValidation({
      state: { email, password },
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
                paddingBottom: isShowKeyboard ? 32 : 144,
              }}
            >
              <View>
                <Text style={styles.title}>Войти</Text>

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
                  {isFieldInError("password") &&
                    getErrorsInField("password").map((errorMessage, indx) => (
                      <Text style={{ color: "red", marginTop: 5 }} key={indx}>
                        {errorMessage}
                      </Text>
                    ))}
                  <TouchableOpacity
                    style={styles.showPasswordContainer}
                    onPress={showPassword}
                  >
                    <Text style={styles.showPassword}>Показать</Text>
                  </TouchableOpacity>
                </View>
              </View>
              {!isShowKeyboard && (
                <View>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.button}
                    onPress={onSubmit}
                  >
                    <Text style={styles.buttonText}>Войти</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.goRegisterContainer}
                    onPress={() => {
                      navigation.navigate("Registration");
                    }}
                  >
                    <Text style={styles.goRegisterText}>
                      Нет аккаунта? Зарегистрироваться
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
