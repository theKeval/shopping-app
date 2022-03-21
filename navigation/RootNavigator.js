import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, ActivityIndicator } from 'react-native';

import Firebase from '../FirebaseConfig/Config';
import { AuthenticatedUserContext } from './AuthenticatedUserProvider';
import HomeStack from './HomeStack';
import { GetUserInfo, removeAsyncUser, saveAsyncUser } from '../FirebaseConfig/FirebaseOperations';

const auth = Firebase.auth();

// export const { user, setUser } = useState({});

export default function RootNavigator() {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // onAuthStateChanged returns an unsubscriber
    const unsubscribeAuth = auth.onAuthStateChanged(async authenticatedUser => {
      try {
        await (authenticatedUser ? setUser(authenticatedUser) : setUser(null));
        console.log('authenticatedUser changed');
        if(authenticatedUser){
          GetUserInfo(authenticatedUser.email).then(userInfo =>{
            setUser({...authenticatedUser, ...userInfo})
          })
        }else{
          removeAsyncUser();
        }
        
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    });
    console.log("unsubscribeAuth");
    // unsubscribe auth listener on unmount
    return unsubscribeAuth;
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  return (
    <NavigationContainer>
     <HomeStack />
    </NavigationContainer>
  );
}
