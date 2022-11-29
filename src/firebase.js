// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import * as firebase from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWXA8QlqoqzwRsgKSM4_iSbnr_IlvSawg",
  authDomain: "todo-auth-469af.firebaseapp.com",
  projectId: "todo-auth-469af",
  storageBucket: "todo-auth-469af.appspot.com",
  messagingSenderId: "369564569811",
  appId: "1:369564569811:web:b0327deaf4e41785d80426",
  measurementId: "G-PK3RCGN1LF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);


export { app, auth }
