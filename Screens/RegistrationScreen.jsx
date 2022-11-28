import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
  KeyboardAvoidingView,
} from "react-native";

const initialState = {
  login: "",
  email: "",
  password: "",
};

export const Registration = ({
  keyboardHide,
  setIsShowKeyboard,
  isShowKeyboard,
  toggle,
}) => {
  const [state, setstate] = useState(initialState);

  const handleSubmit = () => {
    setIsShowKeyboard(false);
    keyboardHide();
    console.log(state);
    setstate(initialState);
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <View style={{ ...styles.form, paddingBottom: isShowKeyboard ? 32 : 78 }}>
        <View>
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
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.button}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>Зарегистрироваться</Text>
        </TouchableOpacity>
        <View style={styles.buttonLogin}>
          <Button
            onPress={() => {
              toggle(false);
            }}
            title="Уже есть аккаунт? Войти"
            color="#1B4371"
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  input: {
    position: "relative",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    height: 50,
    borderRadius: 8,
    padding: 16,
  },
  form: {
    paddingTop: 92,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "#FFFFFF",

    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
  },
  title: {
    color: "#212121",
    fontSize: 30,
    textAlign: "center",
    marginBottom: 33,
  },

  button: {
    height: 50,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
    justifyContent: "center",
    alignItems: "center",

    marginTop: 43,
  },
  buttonText: {
    color: "#f0f8ff",
  },

  buttonLogin: { marginTop: 16 },
  showPassword: {
    position: "absolute",
    right: 16,
    top: 16,
    color: "#1B4371",
  },
});
