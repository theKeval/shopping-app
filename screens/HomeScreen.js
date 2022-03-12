import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import { render } from 'react-dom';
import { StyleSheet, Text, View } from 'react-native';

import { IconButton } from '../components';
import Firebase from '../FirebaseConfig/Config'
import { Create, Update } from '../FirebaseConfig/FirebaseOperations';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import  HeaderComponents from './HeaderComponents';
import BottomComponents from './BottomComponents';

const auth = Firebase.auth();

export default function HomeScreen() {
  const { user } = useContext(AuthenticatedUserContext);

  // Create({
  //   email: user.email,
  //   id: user.uid,
  // })

  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };

    
     return (
      
        <View style ={styles.container}>
         <View style={styles.row}>
            <Text style={styles.title}>Welcome {user.email}!</Text>
            <IconButton
            name='logout'
            size={24}
            color='#fff'
            onPress={handleSignOut}
            />
          </View>
          <Text style={styles.text}>Your UID is: {user.uid} </Text>
        </View>
        
    );
    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MangoStyles.mangoPaleOrange,
    paddingHorizontal: 0
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 20
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    bottom: 0
  },
  text: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#000'
  }
});
