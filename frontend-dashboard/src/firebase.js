// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCyziMmBDF3EUic692NgehZ4hQLk8NdHvo",
    authDomain: "vanfleet-platform.firebaseapp.com",
    projectId: "vanfleet-platform",
    storageBucket: "vanfleet-platform.firebasestorage.app",
    messagingSenderId: "905223748282",
    appId: "1:905223748282:web:a24e86bfbc0dec23dee083",
    measurementId: "G-10GT5MWKP9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export default app;
