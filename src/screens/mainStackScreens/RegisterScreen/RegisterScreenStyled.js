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
  input: {
    position: "relative",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    height: 50,
    borderRadius: 8,
    padding: 16,
    fontFamily: "Roboto-Medium",
    fontWeight: 400,
  },
  form: {
    position: "relative",
    paddingTop: 92,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "#FFFFFF",
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
  },
  title: {
    color: "#212121",
    fontFamily: "Roboto-Medium",
    fontWeight: 500,
    fontSize: 30,
    textAlign: "center",
    marginBottom: 33,
  },

  button: {
    height: 50,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
    justifyContent: "center",
    alignItems: "center",

    marginTop: 43,
  },
  buttonText: {
    color: "#f0f8ff",
    fontFamily: "Roboto-Medium",
    fontWeight: 400,
  },

  goLoginContainer: {
    marginTop: 16,
    alignItems: "center",
  },
  goLoginText: {
    fontFamily: "Roboto-Medium",
    fontWeight: 400,
    color: "#1B4371",
  },
  showPassword: {
    position: "absolute",
    right: 16,
    top: 16,
    color: "#1B4371",
    fontFamily: "Roboto-Medium",
    fontWeight: 400,
  },
});
