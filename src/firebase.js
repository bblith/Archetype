import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; 

const firebaseConfig = {
  apiKey: "AIzaSyDv67FDzqHokCyD6WLXUpZmgXbeN7pGueU",
  authDomain: "archetype-f2838.firebaseapp.com",
  projectId: "archetype-f2838",
  storageBucket: "archetype-f2838.firebasestorage.app",
  messagingSenderId: "913778956913",
  appId: "1:913778956913:web:81f7eb9b991b4c5ef099d0",
  measurementId: "G-HRWWSW43JS"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export {storage}; 
export default app;