// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLXy6hR9If1TrdLwom9LWjd3IcSwvvAL4",
  authDomain: "docx-2ac46.firebaseapp.com",
  projectId: "docx-2ac46",
  storageBucket: "docx-2ac46.firebasestorage.app",
  messagingSenderId: "1447971364",
  appId: "1:1447971364:web:4e1d4bcc90f457fc32a6b1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
