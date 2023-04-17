import "firebase/compat/analytics";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import "firebase/compat/firestore";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./config";

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore();

export { auth, db };
export default firebase;
