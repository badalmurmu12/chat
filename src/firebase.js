// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from 'firebase/database';
import { getStorage } from "firebase/storage";
import { getAuth, signInWithPopup, GoogleAuthProvider, OAuthProvider  } from "firebase/auth"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDEA0myZGX0XreshPz7MmHl8aGmiy0inBw",
    authDomain: "rosy-ratio-419722.firebaseapp.com",
    projectId: "rosy-ratio-419722",
    storageBucket: "rosy-ratio-419722.appspot.com",
    messagingSenderId: "662226239165",
    appId: "1:662226239165:web:5e365211614269284001d4",
    measurementId: "G-LWZLJ5EBNP",
    databaseURL: "https://rosy-ratio-419722-default-rtdb.asia-southeast1.firebasedatabase.app"
  };

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
export const analytics = getAnalytics(firebase);
export const database = getDatabase(firebase);
export const auth = getAuth(firebase);
export const storage = getStorage(firebase);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({   
  prompt : "select_account "
});

var appleProvider = new OAuthProvider('apple.com');


export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithApplePopup = () => signInWithPopup(auth, appleProvider);

export default firebase;