import React, { useState, createContext,useEffect } from 'react';
import { AsyncStorage } from '@react-native-async-storage/async-storage';
export const AuthenticatedUserContext = createContext({});

export const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userId, setUserID] = useState(null);
  useEffect(() => {
    try {
      const getUser = async ()=>{
        const userIdValue = await AsyncStorage.getItem('USERID');
        if (userIdValue !== null) {

          setUserID(userIdValue)
        }
        
      }
      // getUser();
    } catch (error) {

    }
  })

  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser  }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};
