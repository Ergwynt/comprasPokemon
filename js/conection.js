// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getFirestore, collection, doc, getDoc, getDocs, setDoc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHTmQDCDzFPZajsNzPcspybh_F9DX1WhI",
  authDomain: "compras-pokemon.firebaseapp.com",
  projectId: "compras-pokemon",
  storageBucket: "compras-pokemon.appspot.com",
  messagingSenderId: "44357386372",
  appId: "1:44357386372:web:068ddfee8c32de826182d1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getAnalytics(app);