import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { authSignInUser } from "../../../../redux/auth/authOperations";

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

import { styles } from "./LoginScreenStyled";

const initialState = {
  email: "",
  password: "",
};

export const LoginScreen = ({ navigation }) => {
  const [state, setstate] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const dispatch = useDispatch();

  const onSubmit = () => {
    dispatch(authSignInUser(state));
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    setstate(initialState);
    // navigation.navigate("Home");
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
          source={require("../../../assets/images/photoBg.jpg")}
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
                    value={state.email}
                    onChangeText={(value) =>
                      setstate((prevState) => ({ ...prevState, email: value }))
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
                      setstate((prevState) => ({
                        ...prevState,
                        password: value,
                      }))
                    }
                  />
                  <Text style={styles.showPassword}>Показать</Text>
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
