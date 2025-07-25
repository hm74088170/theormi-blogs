// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsDlXMVp9epbg43FRz_WJnkv-HfhNqw_g",
  authDomain: "blogapp-49aa3.firebaseapp.com",
  projectId: "blogapp-49aa3",
  storageBucket: "blogapp-49aa3.firebasestorage.app",
  messagingSenderId: "1099268233737",
  appId: "1:1099268233737:web:e4574b986d77df9c27f6d8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app);

export default app;