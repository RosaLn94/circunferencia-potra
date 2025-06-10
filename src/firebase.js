import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { getAuth, signInAnonymously } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDETUfdqo2jvEGOggGaLCKW11xs-_vaqZk",
    authDomain: "la-circunferencia-de-la-potra.firebaseapp.com",
    databaseURL: "https://la-circunferencia-de-la-potra-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "la-circunferencia-de-la-potra",
    storageBucket: "la-circunferencia-de-la-potra.firebasestorage.app",
    messagingSenderId: "156871671431",
    appId: "1:156871671431:web:4099e495cb0e2271028222"
};
  
const app = initializeApp(firebaseConfig)
const db = getDatabase(app)
const auth = getAuth(app)
signInAnonymously(auth)

export { db }