import { deleteDoc, doc, getDoc, setDoc, collection, getDocs, refEqual } from 'firebase/firestore';
import { db } from './Config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
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
  
export const Read = async (collectionName, documentName) => {

  try {
    const docRef = doc(db, collectionName, documentName);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      return docSnap.data();
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      return null;
    }

  } catch (error) {
    console.log(error.message);
  }
  

}
  
export const Update = (value, merge, collectionName, documentName) => {
    // MARK: Updating Doc
    const myDoc = doc(db, collectionName, documentName)
  
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
  
export const Delete = (collectionName, documentName) => {
    // MARK: Deleting Doc
    const myDoc = doc(db, collectionName, documentName)
  
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
  saveAsyncUser(user)
}


export const saveAsyncUser = async (user)=>{
  try {
    const jsonValue = JSON.stringify(user)

      await AsyncStorage.setItem('userObj',jsonValue);        
  } catch (error) {

  }
}
export const getAsyncUser = async ()=>{
  try {
    const jsonValue  = await AsyncStorage.getItem('userObj')
      return jsonValue != null ? JSON.parse(jsonValue) : null;

  } catch(e) {
    console.log(error)
  }
  return {}
}

export const getIsAdmin = () =>{
  getAsyncUser().then((user)=>{
    return user.isAdmin;
  }).catch(()=>{
    return false;
  })
}

export const removeAsyncUser= async () => {
  try {
    await AsyncStorage.removeItem('userObj')
  } catch(e) {
    console.log(error)
  }

  console.log('Done.')
}
export const GetUserInfo = async (emailAddress) => {
  // console.log("getting user: " + emailAddress);
  return Read(collectionNames.users, emailAddress);
}
export const getAllUsers = async () => {
  // console.log("getting all users");
  var users = [];

  const querySnapshot = await getDocs(collection(db, collectionNames.users));
  querySnapshot.forEach((doc) => {
    // console.log(doc.id, " => ", doc.data());
    users.push(doc.data());
  });
  
  console.log(users);
  return users;
}
// #endregion

// #region Products related operations

export const getAllProducts = async () => {
  console.log("getting all products");
  var products = [];

  const querySnapshot = await getDocs(collection(db, collectionNames.products));
  querySnapshot.forEach((doc) => {
    // console.log(doc.id, " => ", doc.data());
    products.push(doc.data());
  });
  
  // console.log(products);
  return products;
}
export const createProduct = (product) => {
  const id =  product.id = uuid.v4();
  Create(collectionNames.products,id , product);
}
export const updateProduct = (id, product) => {
  console.log(id, product)
  Update(product, false,collectionNames.products, id);
}

export const getProduct = (id) => {
  return Read(collectionNames.products, id)
  
}
export const removeProduct = (id) => {
  return Delete(collectionNames.products, id)
  
}

// #endregion


// #region Categories related operations

export const getAllCategories = async () => {
  console.log("getting all Categories");
  var categories = [];

  const querySnapshot = await getDocs(collection(db, collectionNames.productCategories));
  querySnapshot.forEach((doc) => {
    // console.log(doc.id, " => ", doc.data());
    categories.push(doc.data());
  });
  
  // console.log(categories);
  return categories;
}
export const createCategory = (category) => {
  const id =  category.id = uuid.v4();
  Create(collectionNames.productCategories,id , category);
}
export const updateCategory = (id, category) => {
  Update(category, false,collectionNames.productCategories, id);
}

export const getCategory = (id) => {
  return Read(collectionNames.productCategories, id)
  
}
export const removeCategory = (id) => {
  return Delete(collectionNames.productCategories, id)
  
}
// #endregion

// #region Orders related operations

export const getAllOrders = async () => {
  console.log("getting all Orders");
  var orders = [];

  const querySnapshot = await getDocs(collection(db, collectionNames.orders));
  querySnapshot.forEach((doc) => {
    // console.log(doc.id, " => ", doc.data());
    orders.push(doc.data());
  });
  
  console.log(orders);
  return orders;
}

// #endregion