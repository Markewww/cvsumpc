//src/firebase-config.js
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvyyYk7UEFQIxZCJg0E06kqQLgMq3bd10",
  authDomain: "cvsumpc-6812c.firebaseapp.com",
  projectId: "cvsumpc-6812c",
  storageBucket: "cvsumpc-6812c.firebasestorage.app",
  messagingSenderId: "181573339493",
  appId: "1:181573339493:web:30797824c767da58e6f98c",
  measurementId: "G-QJMQW50N3F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export services so we can use them in Employer.js
export const auth = getAuth(app);
export const db = getFirestore(app);