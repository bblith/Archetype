import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; 

const firebaseConfig = {
  apiKey: "AIzaSyA3a5Dsiu6kpP_OjylFK9N8MbemhIOBIxg",
  authDomain: "jaghacks2024-a2fa6.firebaseapp.com",
  projectId: "jaghacks2024-a2fa6",
  storageBucket: "jaghacks2024-a2fa6.appspot.com",
  messagingSenderId: "47540251993",
  appId: "1:47540251993:web:d0f04ed3a70a40a0f0b048",
  measurementId: "G-229VDY1JZJ"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export {storage}; 
export default app;