// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5kKXpV1fFXhtTd36iqYejxZqbDGGSHM0",
  authDomain: "react-db-d1cce.firebaseapp.com",
  projectId: "react-db-d1cce",
  storageBucket: "react-db-d1cce.appspot.com",
  messagingSenderId: "629847628863",
  appId: "1:629847628863:web:4e353bfd6400ec3dff6c8a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const database = getFirestore(app);

export  { database , auth };