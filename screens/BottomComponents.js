import { StyleSheet, Text, Button, KeyboardAvoidingView, TextInput, TouchableOpacity, View, Image, Pressable } from 'react-native'
import React, { useEffect,useState } from 'react';
import { Ionicons,FontAwesome5,AntDesign,Entypo,Fontisto,MaterialIcons} from '@expo/vector-icons';
import Logo from '../assets/mango_plane.png';
import MangoStyles from '../styles'
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';

import Firebase from '../FirebaseConfig/Config';
import { StatusBar } from 'expo-status-bar';
import HeaderComponents from './HeaderComponents';

const auth = Firebase.auth();

export default class BottomComponents extends React.Component{


    changeText = (text) => {
        // console.log(text + ' has been pressed')
        this.setState({
            screenText: text
        })
    }

    render()
    {return (
        <View style={styles.container}>
           <View style={styles.NavContainer}>
                    <View style={styles.NavBar}>
                        <Pressable onPress={() => this.changeText('Home')} style={styles.IconBehavior}
                        android_ripple={{borderless:true, radius:50}}>
                            <Entypo name="home" size={26} color={MangoStyles.mangoOrangeYellow} />
                        </Pressable>

                        <Pressable onPress={() => this.changeText('Orders')} style={styles.IconBehavior}
                        android_ripple={{borderless:true, radius:50}}>
                            <Fontisto name="shopping-basket" size={26} color={MangoStyles.mangoOrangeYellow} />
                        </Pressable>

                        <Pressable onPress={() => this.changeText('Search')} style={styles.IconBehavior}
                        android_ripple={{borderless:true, radius:50}}>
                            <Ionicons name="md-search" size={26} color={MangoStyles.mangoOrangeYellow} />
                        </Pressable>

                        <Pressable onPress={() => this.changeText('Account')} style={styles.IconBehavior}
                        android_ripple={{borderless:true, radius:50}}>
                            <MaterialIcons name="account-circle" size={26} color={MangoStyles.mangoOrangeYellow} />
                        </Pressable>

                    </View>

                </View> 
        </View>

    )}
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: MangoStyles.mangoPaleOrange,
        alignItems: 'center',
        justifyContent: 'center',
    },

    NavContainer: {
        position: 'absolute',
        alignItems:  'center',
        bottom: 0,
    },

    NavBar: {
        flexDirection:'row',
        backgroundColor: 'white',
        width:'100%',
        justifyContent: 'space-evenly',
        borderRadius: 0,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.8,
        shadowRadius: 40,
        elevation: 15
    },

    IconBehavior: {
        padding: 12
    }
})