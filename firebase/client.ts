// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD8TiTlhz4MZ-3tkFcGWFJoJCAkRnsDpqI",
  authDomain: "prepverse-bf20b.firebaseapp.com",
  projectId: "prepverse-bf20b",
  storageBucket: "prepverse-bf20b.firebasestorage.app",
  messagingSenderId: "196595007276",
  appId: "1:196595007276:web:587e5dd065292d15003689",
  measurementId: "G-LT9VSSP8PP",
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app)
