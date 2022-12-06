import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { RegisterScreen } from "../screens/mainStackScreens/RegisterScreen";
import { LoginScreen } from "../screens/mainStackScreens/LoginScreen";
import { Home } from "../screens/mainStackScreens/Home";

import { authStateCahngeUser } from "../redux/auth/authOperations";

const MainStack = createNativeStackNavigator();

export const Main = () => {
  const { stateChange } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateCahngeUser());
  }, [stateChange]);

  const [fontsLoaded] = useFonts({
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <NavigationContainer onLayout={onLayoutRootView}>
      <MainStack.Navigator initialRouteName="Login">
        {!stateChange ? (
          <>
            <MainStack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <MainStack.Screen
              name="Registration"
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <MainStack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
        )}
      </MainStack.Navigator>
    </NavigationContainer>
  );
};
