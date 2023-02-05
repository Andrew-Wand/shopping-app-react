import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDPU8xWvDT--RixmRJg5MVxDk1yo9rrigk",

  authDomain: "shopping-app-3af99.firebaseapp.com",

  projectId: "shopping-app-3af99",

  storageBucket: "shopping-app-3af99.appspot.com",

  messagingSenderId: "317240601353",

  appId: "1:317240601353:web:5c43478f417eb4c80e81d8",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const db = getFirestore();
