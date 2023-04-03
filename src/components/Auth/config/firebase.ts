import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import config from "../config/config";
import { getStorage } from "@firebase/storage";
import { getFirestore } from "@firebase/firestore";
const Firebase = firebase.initializeApp(config.firebase);

export const Providers = {
  phone: new firebase.auth.PhoneAuthProvider(),
};

export const auth = firebase.auth();
export const storage = getStorage();
export const db = getFirestore()
export default Firebase;
