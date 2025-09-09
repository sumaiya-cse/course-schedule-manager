import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA6LHweStsp5Anp875SUeQ3drKLgXlSYns",
  authDomain: "courseschedulemanager.firebaseapp.com",
  projectId: "courseschedulemanager",
  storageBucket: "courseschedulemanager.appspot.com",
  messagingSenderId: "929086229458",
  appId: "1:929086229458:android:2edd7700b4898a6da4d60b"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

console.log("Firebase initialized successfully");