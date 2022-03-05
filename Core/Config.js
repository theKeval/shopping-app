import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'
import { deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';

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

export const Create = () => {
  // MARK: Creating New Doc in Firebase
  // Before that enable Firebase in Firebase Console
  const myDoc = doc(db, "MyCollection", "MyDocument")

  // Your Document Goes Here
  const docData = {
    "name": "Khushbu",
    "bio": "CEO and Founder"
  }

  setDoc(myDoc, docData)
    // Handling Promises
    .then(() => {
      // MARK: Success
      alert("Document Created!")
    })
    .catch((error) => {
      // MARK: Failure
      alert(error.message)
    })
}

export const Read = () => {
  // MARK: Reading Doc
  // You can read what ever document by changing the collection and document path here
  const myDoc = doc(db, "MyCollection", "MyDocument")

  getDoc(myDoc)
    // Handling Promises
    .then((snapshot) => {
      // MARK: Success
      if (snapshot.exists) {
        setUserDoc(snapshot.data())
      }
      else {
        alert("No Doc Found")
      }
    })
    .catch((error) => {
      // MARK: Failure
      alert(error.message)
    })

}

export const Update = (value, merge) => {
  // MARK: Updating Doc
  const myDoc = doc(db, "MyCollection", "MyDocument")

  // If you set merge true then it will merge with existing doc otherwise it will be a fresh one
  setDoc(myDoc, value, { merge: merge })
    // Handling Promises
    .then(() => {
      // MARK: Success
      alert("Updated Successfully!")
      setText("")
    })
    .catch((error) => {
      // MARK: Failure
      alert(error.message)
    })
}

export const Delete = () => {
  // MARK: Deleting Doc
  const myDoc = doc(db, "MyCollection", "MyDocument")

  deleteDoc(myDoc)
    // Handling Promises
    .then(() => {
      // MARK: Success
      alert("Deleted Successfully!")
    })
    .catch((error) => {
      // MARK: Failure
      alert(error.message)
    })

}

