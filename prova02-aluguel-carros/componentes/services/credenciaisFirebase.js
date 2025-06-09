// src/services/credenciaisFirebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAUUcSChw7hQszAfWBBbA2Ooy940cBkojU",
  authDomain: "appattrafael.firebaseapp.com",
  projectId: "appattrafael",
  storageBucket: "appattrafael.firebasestorage.app",
  messagingSenderId: "518416898539",
  appId: "1:518416898539:web:ceb3a2e74f22ef207c61ae"
};

// Inicializa o App
const appFirebase = initializeApp(firebaseConfig);

// **NOVO**: inicializa e exporta o Firestore
export const db = getFirestore(appFirebase);

// Mantém export default do App (útil caso queira)
export default appFirebase;
