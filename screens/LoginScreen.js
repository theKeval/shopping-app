import { StyleSheet, Text, Button, KeyboardAvoidingView, TextInput, TouchableOpacity, View, Image } from 'react-native'
import React, { useEffect,useState } from 'react';
import { Ionicons,FontAwesome5,AntDesign,Entypo} from '@expo/vector-icons';
import Logo from '../assets/mango_letter.png';
import MangoStyles from '../styles'
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';

import { Create, Read, Update, Delete } from '../FirebaseConfig/FirebaseOperations';
import Firebase from '../FirebaseConfig/Config';

const auth = Firebase.auth();

const LoginScreen = ({navigation}) => {
  const {height} = useWindowDimensions();
  const [email, emailSetText] = useState('');
  const [password, passwordSetText] = useState('');

  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');
  const [loginError, setLoginError] = useState('');

  const onChangeEmail = textValue => emailSetText(textValue);
  const onChangePass = textValue => passwordSetText(textValue);
  const onPressRegister = () => {
    navigation.navigate('Signup');
  }

  const handlePasswordVisibility = () => {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  };

  const onLogin = async () => {
    try {
      if (email !== '' && password !== '') {
        await auth.signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      setLoginError(error.message);
    }
  };

  return (

    <View style={styles.container} >
      <Image source={Logo}  style={[styles.logo, {height: height*0.3}]} resizeMode="contain" />
      <View style={styles.inputContainer}> 
          
          <View style={styles.inputIcon}>
            <FontAwesome5 name="user-circle" size={20} color="black" />
          </View>
          <TextInput placeholder="Email" value={email} onChangeText={onChangeEmail} style={styles.input}/>

      </View>
      <View style={styles.inputContainer}> 
          <View style={styles.inputIcon}>
            <FontAwesome5 name="key" size={20} color="black" />
          </View>
          <TextInput placeholder="Password" value={password} onChangeText={onChangePass } style={styles.input}/>
      </View>
      <View style={styles.buttonContainer}> 

      <TouchableOpacity
            onPress={onLogin}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onPressRegister}
            style={[styles.button, styles.buttonOutline]}
          >
            <Text style={styles.buttonOutlineText}>Register</Text>
          </TouchableOpacity>
      </View>
</View>
  )
}



const styles = StyleSheet.create({
      container: {
        padding: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: MangoStyles.mangoPaleOrange,
      },
      logo:{
        width:'90%',
        maxWidth: 500,
        maxHeight:150,
        marginBottom: 50,
      },
      inputContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        flexDirection:'row',
        width: '90%'
      },
      inputIcon: {
        borderColor: MangoStyles.mangoOrangeYellow,
        borderWidth: 2,
        borderRadius: 5,
        padding: 13,
        marginRight: 10,
        backgroundColor: 'white',
      },
      input: {
        width: '80%',
        backgroundColor: 'white',
        borderColor: MangoStyles.mangoOrangeYellow,
        borderWidth: 2,
        borderRadius: 5,
        paddingHorizontal: 15,
        paddingVertical: 10,
        
      },
      buttonContainer: {
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
      },
      button: {
        backgroundColor: MangoStyles.mangoOrangeYellow,
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
      },
      buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: MangoStyles.mangoOrangeYellow,
        borderWidth: 2,
      },
      buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
      },
      buttonOutlineText: {
        color: MangoStyles.mangoOrangeYellow,
        fontWeight: '700',
        fontSize: 16,
      },
})

export default LoginScreen