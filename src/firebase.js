// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEQoG3Wlpi88rBLUF32OdccP5Cxx22pR0",
  authDomain: "react-2pm.firebaseapp.com",
  projectId: "react-2pm",
  storageBucket: "react-2pm.appspot.com",
  messagingSenderId: "590572850945",
  appId: "1:590572850945:web:7a6a9a6ba253b4f7ae1500",
  measurementId: "G-771FCGF5YQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
