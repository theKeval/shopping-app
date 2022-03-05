import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'
// import { deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAloE0qKUioXJT9L6rKNGOvVMz3NvIWUxI",
  authDomain: "shopping-app-8201a.firebaseapp.com",
  projectId: "shopping-app-8201a",
  storageBucket: "shopping-app-8201a.appspot.com",
  messagingSenderId: "627486222674",
  appId: "1:627486222674:web:e820279652d636c7d5728b"
};

export const app = initializeApp(firebaseConfig);
// MARK: Firestore Reference
export const db = getFirestore(app);



