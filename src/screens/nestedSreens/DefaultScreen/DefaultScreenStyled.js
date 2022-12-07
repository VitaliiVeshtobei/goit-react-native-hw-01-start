import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",

    marginHorizontal: 16,
  },
  postContainer: {
    marginTop: 32,
  },
  image: {
    width: "100%",
    height: 240,
    borderRadius: 8,
  },
  imageName: {
    color: "#212121",
    fontFamily: "Roboto-Medium",
    fontWeight: 500,
    marginTop: 8,
  },
  detailsContainer: { flexDirection: "row", alignItems: "baseline" },
  commentContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  commentText: {
    marginLeft: 9,
    color: "#BDBDBD",
  },

  locationContainer: {
    marginLeft: 50,
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    marginLeft: 8,
  },
});
