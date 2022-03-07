import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBtZ2Wd_Tr7wynEcBPyjmm_RV1jYRjI4Jo",
    authDomain: "project-management-40ba4.firebaseapp.com",
    projectId: "project-management-40ba4",
    storageBucket: "project-management-40ba4.appspot.com",
    messagingSenderId: "530175303425",
    appId: "1:530175303425:web:53083b3ef6ba81914f4500"
  };

  // initialize firebase
firebase.initializeApp(firebaseConfig);

// initialize services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();

// timestamp
const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, projectStorage, timestamp }