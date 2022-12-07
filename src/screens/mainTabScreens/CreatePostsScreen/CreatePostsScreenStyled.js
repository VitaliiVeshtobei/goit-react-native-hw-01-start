import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 32,
    marginHorizontal: 16,
  },
  camera: {
    height: 300,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  btnContainer: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  confirmFotoContainer: { marginTop: 8 },
  confitmFotoText: {
    fontFamily: "Roboto-Medium",
    fontWeight: 400,
    color: "#BDBDBD",
  },
  inputsContainer: {
    marginTop: 48,
  },
  input: {
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  publishBtnContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
    backgroundColor: "#F6F6F6",
    paddingVertical: 16,
    borderRadius: 100,
  },
  publishText: {
    color: "#BDBDBD",
  },
  deletehBtnContainer: {
    marginTop: 100,
    marginLeft: "auto",
    marginRight: "auto",
    width: 70,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F6F6F6",

    borderRadius: 20,
  },
});
