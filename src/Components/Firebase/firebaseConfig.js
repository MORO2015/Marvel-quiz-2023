// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvvwtbNm988aoPYyr9yUJ_R6SQfw4jTEo",
  authDomain: "marvel-quiz-update-5369c.firebaseapp.com",
  projectId: "marvel-quiz-update-5369c",
  storageBucket: "marvel-quiz-update-5369c.appspot.com",
  messagingSenderId: "1000768793868",
  appId: "1:1000768793868:web:59289f5f717391073c2d29",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const firestore = getFirestore();

export const user = (uid) => doc(firestore, `users/${uid}`);
