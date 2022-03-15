import React, { useContext, useState, useLayoutEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Pressable } from 'react-native'
import MangoStyles from '../styles'
import Firebase from '../FirebaseConfig/Config'
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import { IconButton } from '../components';
import { GetUserInfo } from '../FirebaseConfig/FirebaseOperations';

const auth = Firebase.auth();

const AccountScreen = ({navigation, route}) => {
  const { user } = useContext(AuthenticatedUserContext);
  console.log(user.email);
  // const [userInfo, setUserInfo] = useState({});
  // setUserInfo(GetUserInfo(user.email));
  // console.log(userInfo);

  const handleSignout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      // tabBarStyle: {display: 'none'},
      headerRight: () =>(
        <TouchableOpacity onPress={() => navigation.navigate('MyModal')}>
          <Text style={styles.searchBtn}>
            {/* <Ionicons name='search' size={20} color='white' /> */}
            <IconButton name='logout' size={20} onPress={handleSignout} color='#fff' />
          </Text>
        </TouchableOpacity>
      ),
    });
  })

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>User</Text>
        <Text style={styles.content}>{user.name}</Text>
      </View>
      <View>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.content}>{user.email}</Text>
      </View>
      <View>
        <Text style={styles.label}>Address</Text>
        <Text style={styles.content}>{user.address}M3N 5P9 Laland Road</Text>
      </View>
        <View style={styles.section}>
          <TouchableOpacity onPress={() => this} style={styles.button}>
          <Text style={styles.buttonText}>Change password</Text></TouchableOpacity>

          <TouchableOpacity onPress={() => this} style={styles.button}>
          <Text style={styles.buttonText}>Change address</Text></TouchableOpacity>
        </View>

        <View style={styles.adminSection}>
          <TouchableOpacity onPress={() => this} style={styles.button}>
          <Text style={styles.buttonText}>Check orders</Text></TouchableOpacity>

          <TouchableOpacity onPress={() => this} style={styles.button}>
          <Text style={styles.buttonText}>Add item</Text></TouchableOpacity>
        </View>
    </View>
    
      
    
  )
}

export default AccountScreen


const styles = StyleSheet.create({
  container: {
    fontSize: 18,
    flex: 1,
    backgroundColor: MangoStyles.mangoPaleOrange,
    paddingHorizontal: 0,
    paddingTop:10,
    paddingHorizontal:20
  },
  
  label: {
    fontSize: 22,
    fontWeight: '600',
    paddingTop: 10
  },

  content: {
    fontSize:18,
    fontWeight: '300',
    paddingTop: 2,
    paddingBottom: 15
  },

  section: {
    paddingTop: 25,
    flexDirection:'column',
    margin: 5,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  adminSection: {
    paddingTop: 25,
    flexDirection:'column',
    margin: 5,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  button: {
    margin:5,
    padding:15,
    width: '80%',
    alignItems: 'center',
    backgroundColor: MangoStyles.mangoOrangeYellow,
    borderRadius: 8
  },

  buttonText: {
    fontSize:25,
    color: 'white',
    fontWeight:'700'
  },

  searchBtn: {
    marginRight: 10,
    padding: 5
  }
})