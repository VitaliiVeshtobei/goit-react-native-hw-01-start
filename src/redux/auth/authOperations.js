import db from "../../firebase/config";
import { updateUserProfile, authStateChange, authSignOut } from "./authReducer";

export const authSignUpUser =
  ({ email, password, login, avatar }) =>
  async (dispatch, getState) => {
    try {
      await db.auth().createUserWithEmailAndPassword(email, password);

      const user = await db.auth().currentUser;

      const { displayName, uid, photoURL } = await db.auth().currentUser;

      const response = await fetch(avatar);
      const file = await response.blob();
      await db.storage().ref(`avatars/${uid}`).put(file);
      const processedAvatar = await db
        .storage()
        .ref("avatars")
        .child(uid)
        .getDownloadURL();
      console.log(login, avatar);
      await user.updateProfile({
        displayName: login,
        photoURL: processedAvatar,
      });

      const userUpdateProfile = {
        login: displayName,
        userId: uid,
        avatar: photoURL,
      };

      dispatch(updateUserProfile(userUpdateProfile));
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await db.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log("error", error);
      console.log("error.code", error.code);
      console.log("error.message", error.message);
    }
  };

export const authSignOutUser = () => async (dispatch, getState) => {
  await db.auth().signOut();
  dispatch(authSignOut());
};

export const authStateCahngeUser = () => async (dispatch, getState) => {
  await db.auth().onAuthStateChanged((user) => {
    if (user) {
      const userUpdateProfile = {
        login: user.displayName,
        userId: user.uid,
        avatar: user.photoURL,
      };

      dispatch(authStateChange({ stateChange: true }));
      dispatch(updateUserProfile(userUpdateProfile));
    }
  });
};
