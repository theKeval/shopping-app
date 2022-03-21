import React, { useContext, useState, useEffect,useLayoutEffect  } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Pressable } from 'react-native'
import MangoStyles from '../styles'
import Firebase from '../FirebaseConfig/Config'
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import { IconButton } from '../components';
import { GetUserInfo } from '../FirebaseConfig/FirebaseOperations';
import { LogBox } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, FontAwesome5, AntDesign, MaterialIcons } from '@expo/vector-icons';

LogBox.ignoreLogs(['Setting a timer']);
const auth = Firebase.auth();

const AccountScreen = ({navigation, route}) => {
  const { user } = useContext(AuthenticatedUserContext);
  const [userInfo, setUserInfo] = useState({});

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      GetUserInfo(user.email).then(response => {
        if(response && response !== {}){
          setUserInfo(response)
        }
      })
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);


  const handleSignout = async () => {
    try {
      await AsyncStorage.removeItem('userObj')
      await auth.signOut();
      navigation.navigate('LoginScreen');

    } catch (error) {
      console.log(error);
    }
  };

  const onPressInfoChange = () => {
    navigation.navigate('Account Information');
  }
  
  
  const onPressAccInfoChange = () => {
    auth.sendPasswordResetEmail(user.email)
  }

  React.useLayoutEffect(() => {
    // console.log(userInfo)
    navigation.setOptions({
      
      headerRight: () =>(
        <View style={styles.logoutBtn}>
          <IconButton name='logout' size={20} onPress={handleSignout} color='#fff' />
        </View>
      ),
      
    });
  })

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>User</Text>
        <Text style={styles.content}>{userInfo.name}</Text>
      </View>
      <View>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.content}>{userInfo.email}</Text>
      </View>
      <View>
        <Text style={styles.label}>Address</Text>
        <Text style={styles.content}>{userInfo.address}</Text>
      </View>
        <View style={styles.section}>

          <TouchableOpacity onPress={onPressInfoChange} style={styles.button}>
            <Text style={styles.buttonText}>Edit Info</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressAccInfoChange} style={styles.button}>
            <Text style={styles.buttonText}>Change password</Text>
          </TouchableOpacity>
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

  logoutBtn: {
    marginHorizontal: 10,
    padding:10
  }
})