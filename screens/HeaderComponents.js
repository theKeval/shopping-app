import { StyleSheet, Text, Button, KeyboardAvoidingView, TextInput, TouchableOpacity, View, Image, Pressable } from 'react-native'
import React, { useEffect,useState } from 'react';
import { Ionicons,FontAwesome5,AntDesign,Entypo,Fontisto,MaterialIcons} from '@expo/vector-icons';
import Logo from '../assets/mango_plane.png';
import MangoStyles from '../styles'
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';

import Firebase from '../FirebaseConfig/Config';
import { StatusBar } from 'expo-status-bar';


const auth = Firebase.auth();

export default class HeaderComponents extends React.Component{

    state = {
        screenText: 'Home'
    }

    changeText = (text) => {
        console.log(text + 'has been pressed')
        this.setState({
            screenText: text
        })
    }


    render() 
        {return (
            <View style={styles.container}>
                <View style={styles.HeaderContainer}>
                    <View style={styles.HeaderBar}>
                        <View onPress={() => this.changeText('Home')}  style={styles.IconBehavior}>
                        <Text style={{fontSize:20, color:MangoStyles.mangoOrangeYellow}}>{this.state.screenText}</Text>
                        </View>
                    </View>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        backgroundColor: MangoStyles.mangoPaleOrange,
        alignItems: 'center',
        justifyContent: 'center',
    },

    HeaderContainer: {
        position: 'absolute',
        alignItems: 'center',
        top: 40,

    },

    HeaderBar: {
        flexDirection:'row',
        backgroundColor: 'white',
        width:'100%',
        justifyContent: 'space-evenly',
        borderRadius: 0,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.8,
        shadowRadius: 40,
        elevation: 3,
        height: 40
    },
});


