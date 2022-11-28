import { useState, useEffect } from "react";

import {
  StyleSheet,
  ImageBackground,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";

import * as Font from "expo-font";
// import { AppLoading } from "expo";
import AppLoading from "expo-app-loading";

import { Registration } from "./Screens/RegistrationScreen";
import { Login } from "./Screens/LoginScreen";

const loadApplication = async () => {
  await Font.loadAsync({
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });
};

export default function App() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [toggleRegLog, setToggleRegLog] = useState(true);
  const [iasReady, setIasReady] = useState(false);
  const [dimensions, setdimensions] = useState(
    Dimensions.get("window").width - 20 * 2
  );
  console.log(dimensions);
  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width - 20 * 2;

      setdimensions(width);
    };
    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  }, []);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const toggle = (bool) => {
    setToggleRegLog(bool);
  };

  if (!iasReady) {
    return (
      <AppLoading
        startAsync={loadApplication}
        onFinish={() => setIasReady(true)}
        onError={console.warn}
      />
    );
  }

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
              dimensions={dimensions}
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
    // alignItems: "center",
  },
});
