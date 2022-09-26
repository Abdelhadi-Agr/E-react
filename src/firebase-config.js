import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import {getStorage} from 'firebase/storage'
import { getAuth,GoogleAuthProvider,signInWithPopup } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAzZ_b2joKHNlB_vHGB6V6v6eVB3TI7pus",
  authDomain: "social-app-d1f50.firebaseapp.com",
  projectId: "social-app-d1f50",
  storageBucket: "social-app-d1f50.appspot.com",
  messagingSenderId: "753953082774",
  appId: "1:753953082774:web:e55ac2dcce88271e42a1b7"
}

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

