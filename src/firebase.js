// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAByIx3KKVPJofurVc1FIbx8e24CzDVOz8",
    authDomain: "clone-938d8.firebaseapp.com",
    projectId: "clone-938d8",
    storageBucket: "clone-938d8.firebasestorage.app",
    messagingSenderId: "611481570389",
    appId: "1:611481570389:web:eddb4f9fd6893224ced8dc",
    measurementId: "G-K62QDSVRWL"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };