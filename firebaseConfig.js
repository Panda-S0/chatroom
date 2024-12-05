// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getReactNativePersistence, initializeAuth } from "firebase/auth"
import { getFirestore, collection } from "firebase/firestore"
// Your web app's Firebase configuration
import AsyncStorage from "@react-native-async-storage/async-storage"
const firebaseConfig = {
  apiKey: "AIzaSyDIfvHDZ1pZwK2vgqsjdLPR70cPRVihSeY",
  authDomain: "chatroom-5809d.firebaseapp.com",
  projectId: "chatroom-5809d",
  storageBucket: "chatroom-5809d.appspot.com", //chatroom-5809d.firebasestorage.app
  messagingSenderId: "1000875117407",
  appId: "1:1000875117407:web:b1b900d3a98015a13444ea", //1:1000875117407:web:dfe6b3f2b3a083573444ea
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
})

export const db = getFirestore(app)

export const usersRef = collection(db, "users")
export const roomRef = collection(db, "rooms")
