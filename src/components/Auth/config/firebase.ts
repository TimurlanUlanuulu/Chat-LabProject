import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import config from "../config/config";
const Firebase = firebase.initializeApp(config.firebase);

export const Providers = {
  phone: new firebase.auth.PhoneAuthProvider(),
};

export const auth = firebase.auth();
export default Firebase;
