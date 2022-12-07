import React from "react";

import { View } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons, AntDesign, Feather } from "@expo/vector-icons";

const MainTab = createBottomTabNavigator();

import PostsScreen from "../../mainTabScreens/PostsScreen/PostsScreen";
import ProfileScreen from "../../mainTabScreens/ProfileScreen/ProfileScreen";
import CreatePostsScreen from "../../mainTabScreens/CreatePostsScreen/CreatePostsScreen";

import { styles } from "./HomeStyled";

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
