import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAryq2RbbNmdZakHfEP85xXyBVx3Mq6Xbk",
    authDomain: "blog12-f6a97.firebaseapp.com",
    projectId: "blog12-f6a97",
    storageBucket: "blog12-f6a97.appspot.com",
    messagingSenderId: "546373204118",
    appId: "1:546373204118:web:28544d574ac8e9677ceab7",
    measurementId: "G-GG3HXS020Q"
  };

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };