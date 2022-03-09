import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, Button as RNButton, Image, TouchableOpacity } from 'react-native';
import Logo from '../assets/mango_letter.png';
import SmallLogo from '../assets/mango_plane.png';
import MangoStyles from '../styles'
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';
import { Ionicons, FontAwesome5, AntDesign, MaterialIcons } from '@expo/vector-icons';

import { InputField, ErrorMessage } from '../components';
import Firebase from '../FirebaseConfig/Config';

const auth = Firebase.auth();

export default function SignupScreen({ navigation }) {
  const {height} = useWindowDimensions();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');
  const [signupError, setSignupError] = useState('');

  const handlePasswordVisibility = () => {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  };

  const onPressLogin = () => {
    navigation.navigate('Login');
  }

  const onHandleSignup = async () => {
    try {
      if (email !== '' && password !== '') {
        await auth.createUserWithEmailAndPassword(email, password);
      }
      else {
        setSignupError('Enter valid email address and password to signup!')
      }
    } catch (error) {
      setSignupError(error.message);
    }
  };

  return (

    <View style={styles.container} >

      {/* <Image source={Logo}  style={[styles.logo, {height: height*0.3}]} resizeMode="contain" /> */}
      <View style={styles.signupHeader}>
        <Text style={styles.headerText}>Join The Mango Place</Text>
        {/* <Image source={SmallLogo} style={styles.smallLogo} resizeMode='contain' /> */}
      </View>

      <View style={styles.inputContainer}>
          
          <View style={styles.inputIcon}>
            <FontAwesome5 name="user-circle" size={20} color="black" />
          </View>

          <InputField 
              placeholder='Name'
              // autoCapitalize='none'
              // keyboardType='default'
              textContentType='name'
              autoFocus={false}
              value={userName}
              onChangeText={text => setUserName(text)} />

      </View>
      
      <View style={styles.inputContainer}>
          
          <View style={styles.inputIcon}>
            <MaterialIcons name="email" size={20} color="black" />
          </View>

          <InputField 
              placeholder='Email'
              autoCapitalize='none'
              keyboardType='email-address'
              textContentType='emailAddress'
              autoFocus={false}
              value={email}
              onChangeText={text => setEmail(text)} />

      </View>

      <View style={styles.inputContainer}>

          <View style={styles.inputIcon}>
            <FontAwesome5 name="key" size={20} color="black" />
          </View>

          <InputField 
            placeholder='Password'
            autoCapitalize='none'
            autoCorrect={false}
            secureTextEntry={passwordVisibility}
            textContentType='password'
            rightIcon={rightIcon}
            value={password}
            onChangeText={text => setPassword(text)}
            handlePasswordVisibility={handlePasswordVisibility} />

      </View>

      <View style={styles.inputContainer}>
          
          <View style={styles.inputIcon}>
            <FontAwesome5 name="phone-alt" size={20} color="black" />
          </View>

          <InputField 
              placeholder='Phone #'
              autoCapitalize='none'
              keyboardType='phone-pad'
              textContentType='telephoneNumber'
              autoFocus={false}
              value={phoneNumber}
              onChangeText={text => setPhoneNumber(text)} />

      </View>

      <View style={styles.inputContainer}>
          
          <View style={styles.inputIcon}>
            <FontAwesome5 name="address-card" size={20} color="black" />
          </View>

          <InputField multiline
              inputStyle={{maxHeight: 60}}
              placeholder='Address'
              // autoCapitalize='none'
              // keyboardType='phone-pad'
              textContentType='fullStreetAddress'
              autoFocus={false}
              value={address}
              onChangeText={text => setAddress(text)} />

      </View>

      {signupError ? <ErrorMessage error={signupError} visible={true} /> : null}

      <View style={styles.buttonContainer}> 

        <TouchableOpacity
            onPress={onHandleSignup}
            style={styles.button}>

            <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity
            onPress={onPressLogin}
            style={[styles.button, styles.buttonOutline]}>

              <Text style={styles.buttonOutlineText}>Back to Login</Text>

        </TouchableOpacity>

      </View>
    </View>

// #region commented old code
    // <View style={styles.container}>
    //   <StatusBar style='dark-content' />
    //   <Text style={styles.title}>Create new account</Text>
    //   <InputField
    //     inputStyle={{
    //       fontSize: 14
    //     }}
    //     containerStyle={{
    //       backgroundColor: '#fff',
    //       marginBottom: 20
    //     }}
    //     leftIcon='email'
    //     placeholder='Enter email'
    //     autoCapitalize='none'
    //     keyboardType='email-address'
    //     textContentType='emailAddress'
    //     autoFocus={true}
    //     value={email}
    //     onChangeText={text => setEmail(text)}
    //   />
    //   <InputField
    //     inputStyle={{
    //       fontSize: 14
    //     }}
    //     containerStyle={{
    //       backgroundColor: '#fff',
    //       marginBottom: 20
    //     }}
    //     leftIcon='lock'
    //     placeholder='Enter password'
    //     autoCapitalize='none'
    //     autoCorrect={false}
    //     secureTextEntry={passwordVisibility}
    //     textContentType='password'
    //     rightIcon={rightIcon}
    //     value={password}
    //     onChangeText={text => setPassword(text)}
    //     handlePasswordVisibility={handlePasswordVisibility}
    //   />
    //   {signupError ? <ErrorMessage error={signupError} visible={true} /> : null}
    //   <Button
    //     onPress={onHandleSignup}
    //     backgroundColor='#f57c00'
    //     title='Signup'
    //     tileColor='#fff'
    //     titleSize={20}
    //     containerStyle={{
    //       marginBottom: 24
    //     }}
    //   />
    //   <RNButton
    //     onPress={() => navigation.navigate('Login')}
    //     title='Go to Login'
    //     color='#fff'
    //   />
    // </View>
// #endregion

  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    paddingTop: 75,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: MangoStyles.mangoPaleOrange,
  },
  logo:{
    width:'90%',
    maxWidth: 500,
    maxHeight:150,
    marginBottom: 50,
  },
  smallLogo: {
    height: 45,
    width: 45,
    // marginRight: 10,
  },
  signupHeader: {
    flexDirection: 'row',
    marginBottom: 50,
    alignItems: 'center',
  },
  headerText: {
    color: MangoStyles.mangoGreen,
    fontSize: 25,
    // marginLeft: 10,
    fontWeight: 'bold',
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
});
