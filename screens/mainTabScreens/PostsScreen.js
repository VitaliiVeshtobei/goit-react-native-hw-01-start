import React from "react";
import { useDispatch } from "react-redux";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DefaultScreenPosts from "../nestedSreens/DefaultScreenPosts";
import CommentsScreen from "../nestedSreens/CommentsScreen";
import MapScreen from "../nestedSreens/MapScreen";

import { authSignOutUser } from "../../redux/auth/authOperations";

const NestedScreen = createNativeStackNavigator();

const PostsScreen = ({ navigation }) => {
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

const styles = StyleSheet.create({
  logOutContainer: {
    marginRight: 10,
  },
});

export default PostsScreen;
