// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyCBUSbj5U2McZ6k5z_4v9VM_0RzW4thwUI",
  authDomain: "shopping-app-6a9a2.firebaseapp.com",
  projectId: "shopping-app-6a9a2",
  storageBucket: "shopping-app-6a9a2.appspot.com",
  messagingSenderId: "93992005315",
  appId: "1:93992005315:web:4f939caade442f4af17c76",
  measurementId: "G-RK49BXMM1M"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()

export { auth };