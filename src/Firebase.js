import firebase from "firebase/app";
import "firebase/firestore";
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBLImfCznE8d5WW50mxGqg5ZDMVejbVRFM",
    authDomain: "catapp-f2146.firebaseapp.com",
    projectId: "catapp-f2146",
    storageBucket: "catapp-f2146.appspot.com",
    messagingSenderId: "30887421949",
    appId: "1:30887421949:web:9e00330ba3afeb9f0f1b94",
    measurementId: "G-B9LN1GVHC9"
  };
  
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
var storage = firebase.storage();

// Create a storage reference from our storage service


// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

export  {db, firebase,storage}
