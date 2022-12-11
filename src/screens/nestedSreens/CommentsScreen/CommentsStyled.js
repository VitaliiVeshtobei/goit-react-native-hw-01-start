import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    marginHorizontal: 16,
    marginBottom: 16,
  },
  commentContainer: {
    flexDirection: "row",

    alignItems: "baseline",
    marginTop: 32,
  },
  avatarContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: { width: 28, height: 28, borderRadius: 50 },
  login: { marginTop: 5, color: "#FF6C00" },
  image: {
    width: "100%",
    height: 240,
    borderRadius: 8,
  },
  commentTextContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderRadius: 6,
    marginLeft: 8,
    padding: 16,
  },
  comment: {
    fontFamily: "Roboto-Medium",
    fontSize: 13,
    color: "#212121",
  },
  commentDate: {
    fontFamily: "Roboto-Medium",
    fontSize: 10,
    color: "#BDBDBD",
    marginTop: 8,
  },
  inputContainer: { position: "relative" },
  inputText: {
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderColor: "#E8E8E8",
    borderRadius: 100,
    padding: 16,
  },

  btn: {
    position: "absolute",
    top: 8,
    right: 14,
    width: 34,
    height: 34,
    borderRadius: 100,

    backgroundColor: "#FF6C00",
    alignItems: "center",
    justifyContent: "center",
  },
});
