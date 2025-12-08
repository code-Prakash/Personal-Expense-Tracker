import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDu2UqueTw9xQQ4FRPvGKsdlZkR-twefR0",
  authDomain: "expense-tracker-c50e3.firebaseapp.com",
  projectId: "expense-tracker-c50e3",
  storageBucket: "expense-tracker-c50e3.firebasestorage.app",
  messagingSenderId: "516246751084",
  appId: "1:516246751084:web:ccba9bcf45adefeb8e5549",
  measurementId: "G-DF5VN1H70W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();