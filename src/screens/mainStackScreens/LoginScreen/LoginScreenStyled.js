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
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "#FFFFFF",

    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
  },
  title: {
    color: "#212121",
    fontSize: 30,
    textAlign: "center",
    marginBottom: 33,
    fontFamily: "Roboto-Medium",
    fontWeight: 500,
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

  goRegisterContainer: {
    marginTop: 16,
    alignItems: "center",
  },
  goRegisterText: {
    fontFamily: "Roboto-Medium",
    fontWeight: 400,
    color: "#1B4371",
  },
  showPasswordContainer: {
    position: "absolute",
    right: 16,
    top: 16,
  },
  showPassword: {
    color: "#1B4371",
    fontFamily: "Roboto-Medium",
    fontWeight: 400,
  },
});
