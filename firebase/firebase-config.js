import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "hotelist-447e9.firebaseapp.com",
    projectId: "hotelist-447e9",
    storageBucket: "hotelist-447e9.appspot.com",
    messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};

export const app = initializeApp(firebaseConfig);