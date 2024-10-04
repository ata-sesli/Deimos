// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAHmbgMW5yYRjhUMrdS-Ux3k9bq4WlRCXM",
    authDomain: "deimos-gdg.firebaseapp.com",
    projectId: "deimos-gdg",
    storageBucket: "deimos-gdg.appspot.com",
    messagingSenderId: "405314543577",
    appId: "1:405314543577:web:1280a71c799c9cb8e443c8",  
    measurementId: "G-SK2WLD4WKP"
  };  
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };