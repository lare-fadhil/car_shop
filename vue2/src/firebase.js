import { initializeApp } from "firebase/app";
import "firebase/auth";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDtAdo8O0WTBSDjl_q5e__7htIHF5efN3o",
    authDomain: "carshop-db068.firebaseapp.com",
    projectId: "carshop-db068",
    storageBucket: "carshop-db068.appspot.com",
    messagingSenderId: "1040099434492",
    appId: "1:1040099434492:web:9a96c99a775f4683435c79",
    measurementId: "G-LLSPZSNR2N"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export { auth, app, signInWithEmailAndPassword, sendPasswordResetEmail }
    