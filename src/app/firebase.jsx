import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyDApdgZEgNHE-DQKGTUT_6tEmwcQD_-FIM",
    authDomain: "doge-sales.firebaseapp.com",
    databaseURL: "https://doge-sales-default-rtdb.firebaseio.com",
    projectId: "doge-sales",
    storageBucket: "doge-sales.appspot.com",
    messagingSenderId: "148439389621",
    appId: "1:148439389621:web:71c3a5419cee07976075fc",
    measurementId: "G-RBDD1Y0X46"
  };
  
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db=getFirestore(app);