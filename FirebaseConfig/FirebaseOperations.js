import { deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './Config';


const collectionNames = {
  users: "Users",
  productCategories: "ProductCategories",
  products: "Products",
  orders: "Orders",
  productsInOrder: "ProductsInOrder"
}

export const Create = (collectionName, documentName, value) => {
    console.log("Create called");

    // MARK: Creating New Doc in Firebase
    // Before that enable Firebase in Firebase Console
    const myDoc = doc(db, collectionName, documentName);
  
    // Your Document Goes Here
    const docData = {
      "name": "Keval",
      "bio": "Sr. Software Engineer"
    };
  
    setDoc(myDoc, value)
      // Handling Promises
      .then(() => {
        // MARK: Success
        // alert("Document Created!")
        console.log("user added");
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
        // setText("")
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


// #region Users related operations

export const Signup = (emailAddress, user) => {
  console.log("signup called");
  Create(collectionNames.users, emailAddress, user);
}

// #endregion
