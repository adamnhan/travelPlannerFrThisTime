// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDEzkLyvueSErKAG4uCAQgOE2opK93qT_M",
  authDomain: "travel-planner-82f03.firebaseapp.com",
  projectId: "travel-planner-82f03",
  storageBucket: "travel-planner-82f03.appspot.com",
  messagingSenderId: "438509567643",
  appId: "1:438509567643:web:5a3e298f60bc808805503e",
  measurementId: "G-3466BVJ9L4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
export default app;