import { useState } from "react";

import {
  StyleSheet,
  ImageBackground,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

import { Registration } from "./Screens/RegistrationScreen";
import { Login } from "./Screens/LoginScreen";

export default function App() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [toggleRegLog, setToggleRegLog] = useState(true);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const toggle = (bool) => {
    setToggleRegLog(bool);
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <ImageBackground
          style={styles.image}
          source={require("./assets/images/photoBg.jpg")}
        >
          {/* <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          > */}
          {toggleRegLog ? (
            <Registration
              toggle={toggle}
              keyboardHide={keyboardHide}
              setIsShowKeyboard={setIsShowKeyboard}
              isShowKeyboard={isShowKeyboard}
            />
          ) : (
            <Login
              toggle={toggle}
              keyboardHide={keyboardHide}
              setIsShowKeyboard={setIsShowKeyboard}
              isShowKeyboard={isShowKeyboard}
            />
          )}

          {/* </KeyboardAvoidingView> */}
        </ImageBackground>
      </TouchableWithoutFeedback>
    </View>
  );
}

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
});
