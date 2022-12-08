//import database from "firebase/database";
//import auth from "firebase/auth";
//import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase/compat/app';
import "firebase/compat/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyAMXpJVBdCAWOQqAJJ1lFObcHYtwaI5vMg",
    authDomain: "appbodas-9965b.firebaseapp.com",
    projectId: "appbodas-9965b",
    storageBucket: "appbodas-9965b.appspot.com",
    messagingSenderId: "591044784073",
    appId: "1:591044784073:web:138f345b76cade02ef0218",
    measurementId: "G-SQ0TV0GKWN"
  };
  
  // Initialize Firebase
 firebase.initializeApp(firebaseConfig);
  //const analytics = getAnalytics(app);
  const db = firebase.firestore();
  //const authE = auth;

  export { db };