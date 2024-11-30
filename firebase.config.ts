import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyD01Un9hebzvp4593VCPpCJTMSUszXgbGk",
  authDomain: "acesso-quimico.firebaseapp.com",
  projectId: "acesso-quimico",
  storageBucket: "acesso-quimico.firebasestorage.app",
  messagingSenderId: "154672445480",
  appId: "1:154672445480:web:ddc2e07d2a230e19f15d1d",
  measurementId: "G-1CL6WNWBKZ",
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);

export { app, auth };
