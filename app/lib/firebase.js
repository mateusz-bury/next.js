// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "wsei-frontend-app-ac875.firebaseapp.com",
  projectId: "wsei-frontend-app-ac875",
  storageBucket: "wsei-frontend-app-ac875.firebasestorage.app",
  messagingSenderId: "923616268247",
  appId: "1:923616268247:web:c60ae5ef139237561d8592",
  measurementId: "G-DBQK1YT9VL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let analytics;
if (typeof window !== "undefined") {
  const { getAnalytics } = require("firebase/analytics");
  analytics = getAnalytics(initializeApp(firebaseConfig));
}

export const auth = getAuth(app);
export const db = getFirestore(app);