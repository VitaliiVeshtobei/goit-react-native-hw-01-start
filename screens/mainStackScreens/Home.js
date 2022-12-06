import React from "react";

import { StyleSheet, View } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons, AntDesign, Feather } from "@expo/vector-icons";

const MainTab = createBottomTabNavigator();

import PostsScreen from "../mainTabScreens/PostsScreen";
import ProfileScreen from "../mainTabScreens/ProfileScreen";
import CreatePostsScreen from "../mainTabScreens/CreatePostsScreen";

export const Home = () => {
  return (
    <MainTab.Navigator screenOptions={{ tabBarShowLabel: false }}>
      <MainTab.Screen
        options={{
          headerShown: false,

          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="ios-grid-outline" size={size} color={color} />
          ),
        }}
        name="Posts"
        component={PostsScreen}
      />
      <MainTab.Screen
        options={{
          title: "Создать публикацию",
          tabBarIcon: ({ focused, color, size }) => (
            <View style={styles.plusContainer}>
              <AntDesign name="plus" size={13} color="white" />
            </View>
          ),
        }}
        name="Create"
        component={CreatePostsScreen}
      />
      <MainTab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
};

const styles = StyleSheet.create({
  logOutContainer: {
    marginRight: 10,
  },
  plusContainer: {
    width: 70,
    height: 40,
    backgroundColor: "#FF6C00",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
});
