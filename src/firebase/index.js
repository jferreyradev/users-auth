
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyDxpCnky8ghKFDsExhlqUQbDPJjwrtdS9M",
    authDomain: "boletas-adm.firebaseapp.com",
    projectId: "boletas-adm",
    storageBucket: "boletas-adm.appspot.com",
    messagingSenderId: "730368695122",
    appId: "1:730368695122:web:a2437dac86f13d5213f88b",
    measurementId: "G-G76RMEPDWG"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const db = getFirestore(app);

export { auth, db }