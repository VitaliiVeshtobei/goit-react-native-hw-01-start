import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  loginContainer: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 92,
  },
  loginText: { fontFamily: "Roboto-Regular", fontSize: 30 },
  profileContainer: {
    flex: 1,
    justifyContent: "center",
    marginTop: 147,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#fff",
  },

  photo: {
    position: "absolute",
    left: 150,
    top: -60,
    backgroundColor: "#F6F6F6",

    borderRadius: 16,

    width: 120,
    height: 120,
  },
  add: {
    width: 30,
    height: 30,
    left: 105,
    top: 75,
  },
  postContainer: {
    marginHorizontal: 16,
    marginTop: 32,
  },
  imagePost: {
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
  detailsContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
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
