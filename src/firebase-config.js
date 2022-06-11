// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGQWudn3cZ7quNR0TV-rkdmu6PAVQmfn4",
  authDomain: "st-hackathon.firebaseapp.com",
  databaseURL: "https://st-hackathon.firebaseio.com",
  projectId: "st-hackathon",
  storageBucket: "st-hackathon.appspot.com",
  messagingSenderId: "699655471004",
  appId: "1:699655471004:web:dce858ca96e21f3805d259",
  measurementId: "G-K2FXMJ6JNP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
