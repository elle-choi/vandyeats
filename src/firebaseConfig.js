import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAJ8cKJgJoJemPxufOJX-R1B8CvlQ6WI8w",
    authDomain: "vandyeats-59a6b.firebaseapp.com",
    projectId: "vandyeats-59a6b",
    storageBucket: "vandyeats-59a6b.appspot.com",
    messagingSenderId: "415099228234",
    appId: "1:415099228234:web:865cc55650616b7f97d6b3",
    measurementId: "G-50KQY00DYC"
  };

  const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth();


export { db, storage, auth};