// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCMZY867goOnvXmtZdl8kPh5xRGUS3b9e8",
    authDomain: "wasl-c1a42.firebaseapp.com",
    projectId: "wasl-c1a42",
    storageBucket: "wasl-c1a42.firebasestorage.app",
    messagingSenderId: "788254945501",
    appId: "1:788254945501:web:caa3b4470c1578d965eb34",
    measurementId: "G-B46ZYWCF7Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


const auth = getAuth(app);
export { app, db, auth };

