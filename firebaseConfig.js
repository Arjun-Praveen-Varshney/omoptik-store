// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  setDoc,
  doc,
  updateDoc,
  getDoc,
  getDocs,
  collection,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhWkWn-ldMM4A47qUmW7c3OyN5siSMnCY",
  authDomain: "omoptik-panvel-stock.firebaseapp.com",
  projectId: "omoptik-panvel-stock",
  storageBucket: "omoptik-panvel-stock.appspot.com",
  messagingSenderId: "88111838357",
  appId: "1:88111838357:web:e7435ca354a3320cdb579c",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export { setDoc, doc, updateDoc, getDoc, getDocs, collection };
