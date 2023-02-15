// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTRiQZs7c6cwi911BEoxLI9yvz0JGBUTQ",
  authDomain: "diffin-chat.firebaseapp.com",
  projectId: "diffin-chat",
  storageBucket: "diffin-chat.appspot.com",
  messagingSenderId: "214497927095",
  appId: "1:214497927095:web:f14dd32babe23e7d8e9232"
};

// Initialize Firebase

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db as firebaseDb, auth as firebaseAuth, provider as firebaseProvider };
