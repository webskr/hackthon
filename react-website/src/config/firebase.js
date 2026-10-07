import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace this with your actual "freelance" Firebase project config
// You can find this in your Firebase Console -> Project Settings -> General -> Your apps
const firebaseConfig = {
  apiKey: "AIzaSyBTmIBfng-YxhOfGINFBUzrm5bOIZQq1tg",
  authDomain: "freelance-26dea.firebaseapp.com",
  projectId: "freelance-26dea",
  storageBucket: "freelance-26dea.firebasestorage.app",
  messagingSenderId: "253639415603",
  appId: "1:253639415603:web:bceef0f21f22a7a334d046",
  measurementId: "G-VRL37PFPXX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
