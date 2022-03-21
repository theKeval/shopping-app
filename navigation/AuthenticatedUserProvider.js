import React, { useState, createContext,useEffect } from 'react';
import { AsyncStorage } from '@react-native-async-storage/async-storage';
export const AuthenticatedUserContext = createContext({});
import { getAllProducts, GetUserInfo,getAsyncUser } from '../FirebaseConfig/FirebaseOperations';

export const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    try {
      // const getUser = async ()=>{
      //   getAsyncUser().then(response => {
      //     if (response !== null) {

      //       setUserObj(response)
      //     }
      //   })

        
      // }
      //  getUser();
    } catch (error) {

    }
  })

  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser , userObj}}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};
