import React from "react";
import { useDispatch } from "react-redux";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DefaultScreenPosts from "../../nestedSreens/DefaultScreen/DefaultScreenPosts";
import CommentsScreen from "../../nestedSreens/CommentsScreen/CommentsScreen";
import MapScreen from "../../nestedSreens/MapScreen/MapScreen";

import { authSignOutUser } from "../../../redux/auth/authOperations";

import { styles } from "./PostsScreenStyled";

const NestedScreen = createNativeStackNavigator();

const PostsScreen = () => {
  const dispatch = useDispatch();
  const signOut = () => {
    dispatch(authSignOutUser());
  };
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="DefaultScreen"
        component={DefaultScreenPosts}
        options={{
          title: "Публикации",
          headerRight: () => (
            <TouchableOpacity style={styles.logOutContainer} onPress={signOut}>
              <Feather name="log-out" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <NestedScreen.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          title: "Комментарии",
        }}
      />
      <NestedScreen.Screen
        name="Map"
        component={MapScreen}
        options={{
          title: "Карта",
        }}
      />
    </NestedScreen.Navigator>
  );
};

export default PostsScreen;
