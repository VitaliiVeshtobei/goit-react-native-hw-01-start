import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { authSignUpUser } from "../../../../redux/auth/authOperations";

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
  const [state, setstate] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const dispatch = useDispatch();

  const onSubmit = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();

    dispatch(authSignUpUser(state));
    setstate(initialState);
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
                paddingBottom: isShowKeyboard ? 32 : 78,
              }}
            >
              <View style={styles.photo}>
                <Image
                  style={styles.add}
                  source={require("../../../assets/images/add.png")}
                />
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
                    setstate((prevState) => ({ ...prevState, login: value }))
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
                    setstate((prevState) => ({ ...prevState, password: value }))
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
