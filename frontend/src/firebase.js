// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJ8cKJgJoJemPxufOJX-R1B8CvlQ6WI8w",
  authDomain: "vandyeats-59a6b.firebaseapp.com",
  projectId: "vandyeats-59a6b",
  storageBucket: "vandyeats-59a6b.appspot.com",
  messagingSenderId: "415099228234",
  appId: "1:415099228234:web:865cc55650616b7f97d6b3",
  measurementId: "G-50KQY00DYC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);