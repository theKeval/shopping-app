import { deleteDoc, doc, getDoc, setDoc, collection, getDocs, refEqual } from 'firebase/firestore';
import { db } from './Config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import moment from 'moment';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
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
        // console.log("user added");
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
        // if(showAlert){
        //   alert("Updated Successfully!")
        // }
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
        // alert("Deleted Successfully!")
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

export const updateUserInfo = (id, user) => {
  Update(user, false,collectionNames.users, id);
}
export const getAllUsers = async () => {
  // console.log("getting all users");
  var users = [];

  const querySnapshot = await getDocs(collection(db, collectionNames.users));
  querySnapshot.forEach((doc) => {
    // console.log(doc.id, " => ", doc.data());
    users.push(doc.data());
  });
  
  return users;
}

export const getUsersFiltered = async (filterTerm) => {
  // console.log("getting all users");
  var users = [];

  const querySnapshot = await getDocs(collection(db, collectionNames.users));
  querySnapshot.forEach((doc) => {
    // console.log(doc.id, " => ", doc.data());
    const userObj = doc.data();
    if(userObj.name.indexOf(filterTerm)>-1 || userObj.email.indexOf(filterTerm)>-1 || userObj.phoneNumber.indexOf(filterTerm)>-1){

      users.push(userObj);
    }
  });
  
  // console.log(users);
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

export const getAllOrders = async (filterStatus) => {
  console.log("getting all Orders");
  var orders = [];

  const querySnapshot = await getDocs(collection(db, collectionNames.orders));
  
  querySnapshot.forEach((doc) => {
    const itobj = doc.data()
    if(itobj.status !== 'shopping' && (filterStatus === 'all' || (filterStatus !== 'all' && itobj.status === filterStatus))){
      // console.log(doc.id, " => ", doc.data());
      orders.push(itobj);
    }
    });

  
  // console.log(orders);
  return orders.sort((a,b) => { return a.date > b.date ? -1 : 1});
}

export const getNextConsecutive = async () => {
  console.log("getting all Orders");
  var ordersTotal = 1;

  const querySnapshot = await getDocs(collection(db, collectionNames.orders));
  querySnapshot.forEach((doc) => {
    // console.log(doc.id, " => ", doc.data());
    const consecutive = parseInt(doc.data().title)
    if(consecutive> ordersTotal){
      ordersTotal=consecutive;
    }
    
  });
  
  
  return ordersTotal.toString().padStart(6, '0');
}

export const getUserOrders = async (userID,filterStatus) => {
  var orders = [];
  // console.log(userID)
  const querySnapshot = await getDocs(collection(db, collectionNames.orders));
  querySnapshot.forEach((doc) => {
      const itobj= doc.data()
      // console.log(itobj.status ,filterStatus )
     if(itobj.userID === userID && itobj.status !== 'shopping' && (filterStatus === 'all' || (filterStatus !== 'all' && itobj.status === filterStatus))){
       orders.push(doc.data())
     }
  });
  
  return orders.sort((a,b) => { return a.date < b.date ? -1 : 1});
}


export const getShopListDoc = async (userID) => {
  console.log("getShopListDoc");
  
  var shopListDoc = null;

  const querySnapshot = await getDocs(collection(db, collectionNames.orders));
  querySnapshot.forEach((doc,i) => {
    const itobj= doc.data()
    if(shopListDoc=== null && itobj.userID === userID && itobj.status === 'shopping' ){
      shopListDoc = (itobj)
    }
 });
    return shopListDoc;
}
export const createOrder = (order) => {
  const id =  order.id = uuid.v4();
  Create(collectionNames.orders,id , order);
}
export const updateOrder = (id, order) => {
  Update(order, false,collectionNames.orders, id);
}

export const getOrder = (id) => {
  return Read(collectionNames.orders, id)
  
}

export const removeOrder = (id) => {
  return Delete(collectionNames.orders, id)
  
}
export const addItemToShoppingCart = async ( item , quantity, userID) => {
  getShopListDoc(userID).then(async (obj) =>{
    
    const totalItem = parseFloat(item.price) * parseFloat(quantity)
    const newItem = {...item,quantity : parseInt(quantity), totalItem : totalItem}
    if(obj === null){
      getNextConsecutive().then(consecutive => {
        createOrder({
          userID: userID,
          title: consecutive,
          status: 'shopping',
          date: moment().toString(),
          total: totalItem,
          items: [newItem]
        })
        
      })
    }else{
      obj.items.push(newItem);
      obj.total = parseFloat(obj.total) + parseFloat(totalItem);
      updateOrder(obj.id,obj);
    }
  })

  
}

export const removeItemShoppingCart = async ( index,userID) => {

let resultObj;
await getShopListDoc(userID).then((obj) =>{
    if(obj !== null){
      if(obj.items.length > 1){
        const objItem = obj.items[index]
        obj.total = parseFloat(obj.total) - (parseFloat(objItem.price) * parseFloat(objItem.quantity));
        obj.items.splice(index,1);
        updateOrder(obj.id,obj);
        resultObj = obj;
      }else{
        removeOrder(obj.id);
        resultObj = null;
      }

    }
  })

  return resultObj
}

export const updateOrderState = ( orderID,newStatus) => {
  getOrder(orderID).then((order) =>{
    if(order !== null){
      order.status =newStatus;
      updateOrder(order.id,order);
    }
    if(newStatus === 'completed'){
      const date = moment(order.date).toString()
      order.items.forEach(item => {
        console.log(item)
        Create(collectionNames.productsInOrder,item.id , {...item,date:date});
      })

    }
  })

}
// #endregion

// #region sales related operations

export const getCategoriesSold = async ( ) => {
  let categories = {}

  const querySnapshot = await getDocs(collection(db, collectionNames.productsInOrder));
  querySnapshot.forEach((doc) => {
    const itemObj = doc.data();
    if(!categories[itemObj.categoryId] ){
      categories[itemObj.categoryId] = {
        id:itemObj.categoryId,
        name:itemObj.categoryName,
        total:0,
        totalWeek:0,
        totalMonth:0
      }
    }
    categories[itemObj.categoryId].total = parseFloat(itemObj.totalItem) +  parseFloat(itemObj.totalItem)
    if(Math.abs(moment().diff(moment(itemObj.date), 'weeks')) < 1){
      categories[itemObj.categoryId].totalWeek = parseFloat(itemObj.totalItem) +  parseFloat(itemObj.totalItem)
    }
    if(Math.abs(moment().diff(moment(itemObj.date), 'months')) < 1){
      categories[itemObj.categoryId].totalMonth = parseFloat(itemObj.totalItem) +  parseFloat(itemObj.totalItem)
    }

  });

  return Object.values(categories);
}

export const getProductsSold = async ( ) => {
  let products = {}

  const querySnapshot = await getDocs(collection(db, collectionNames.productsInOrder));
  querySnapshot.forEach((doc) => {
    const itemObj = doc.data();
    if(!products[itemObj.id] ){
      products[itemObj.id] = {
        id:itemObj.id,
        name:itemObj.name,
        total:0,
        totalWeek:0,
        totalMonth:0
      }
    }
    products[itemObj.id].total = parseFloat(itemObj.total) +  parseFloat(itemObj.totalItem)
    if(Math.abs(moment().diff(moment(itemObj.date), 'weeks')) < 1){
      products[itemObj.id].totalWeek = parseFloat(itemObj.totalWeek) +  parseFloat(itemObj.totalItem)
    }
    if(Math.abs(moment().diff(moment(itemObj.date), 'months')) < 1){
      products[itemObj.id].totalMonth = parseFloat(itemObj.totalMonth) +  parseFloat(itemObj.totalItem)
    }

  });

  return Object.values(products);

}
// #endregion