import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAzZvuDVwmTolk1Y493uGxQyUFMdHtirMY",
  authDomain: "react-native-social-502f4.firebaseapp.com",
  projectId: "react-native-social-502f4",
  storageBucket: "react-native-social-502f4.appspot.com",
  messagingSenderId: "851905657305",
  appId: "1:851905657305:web:d3fbc88e13c6a1c2c781c8",
  measurementId: "G-NF37XXWNM5",
};
// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);
