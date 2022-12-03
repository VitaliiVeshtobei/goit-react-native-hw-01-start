import React from "react";
// import { moduleName } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DefaultScreenPosts from "../nestedSreens/DefaultScreenPosts";
import CommentsScreen from "../nestedSreens/CommentsScreen";
import MapScreen from "../nestedSreens/MapScreen";

const NestedScreen = createNativeStackNavigator();

const PostsScreen = () => {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="DefaultScreen"
        component={DefaultScreenPosts}
        options={{ headerShown: false }}
      />
      <NestedScreen.Screen name="Comments" component={CommentsScreen} />
      <NestedScreen.Screen name="Map" component={MapScreen} />
    </NestedScreen.Navigator>
  );
};

export default PostsScreen;
