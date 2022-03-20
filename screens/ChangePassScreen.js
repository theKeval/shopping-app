import React, { useContext, useEffect, useState } from 'react';
import MangoStyles from '../styles';
import { Ionicons, FontAwesome5, AntDesign, MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View, Button as RNButton, Image, TouchableOpacity } from 'react-native';
import { InputField, ErrorMessage } from '../components';
import Firebase from '../FirebaseConfig/Config';

const auth = Firebase.auth();

export default function ChangePassScreen({ navigation }) {
    const [password, setPassword] = useState('');
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [rightIcon, setRightIcon] = useState('eye');
    const [signupError, setSignupError] = useState('');
  
    const onPressChange = () => {
      navigation.navigate('AccountScreen');
    }
  
    const onPressCancel = () => {
      navigation.navigate('AccountScreen');
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

    
    return (

      <View style={styles.container} >
        
              
        <View style={styles.signupHeader}>
          <Text style={styles.headerText}>Change your password here!</Text>
                
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
            <FontAwesome5 name="key" size={20} color="black" />
          </View>
        
          <InputField 
            placeholder='Confirm Password'
            autoCapitalize='none'
            autoCorrect={false}
            secureTextEntry={passwordVisibility}
            textContentType='password'
            rightIcon={rightIcon}
            value={password}
            onChangeText={text => setPassword(text)}
            handlePasswordVisibility={handlePasswordVisibility} />
        
        </View>        
        
        {signupError ? <ErrorMessage error={signupError} visible={true} /> : null}
        
        <View style={styles.buttonContainer}> 
        
          <TouchableOpacity
            onPress={onPressChange}
            style={[styles.button, styles.buttonOutline]}>

            <Text style={styles.buttonOutlineText}>Confirm</Text>

          </TouchableOpacity>

          <TouchableOpacity
            onPress={onPressCancel}
            style={styles.button}>

            <Text style={styles.buttonText}>Cancel changes</Text>
          </TouchableOpacity>
        
        </View>
      </View>
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
          margin: 5
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
    