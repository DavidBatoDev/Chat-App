import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCW6vH0veAoMUnHAtsiJKMfu-AEz0YGxxQ",
  authDomain: "chat-93d64.firebaseapp.com",
  projectId: "chat-93d64",
  storageBucket: "chat-93d64.appspot.com",
  messagingSenderId: "157296271447",
  appId: "1:157296271447:web:d82fbf960713d2a5e30312"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage();
export const db = getFirestore()
