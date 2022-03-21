import { StyleSheet, Text, View,TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Logo from '../assets/mango_letter.png';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
const ProductListItem = ({ item, onPress, backgroundColor }) => {

    

  return (
    <TouchableOpacity onPress={onPress} style={[styles.item]}>
         <Image resizeMode="contain"
        style={styles.itemImg}
        source={Logo}
      />
        <View style={styles.itemDesc}>
            <Text style={[styles.title]}>{item.name}</Text>
            <Text >{item.description}</Text>
            <Text style={[styles.price]}>{'$ ' + item.price.toString()}</Text>

        </View>
    </TouchableOpacity>
  )
}

export default ProductListItem

const styles = StyleSheet.create({

    item:{
        flexDirection : 'row',
        paddingHorizontal: 2,
        paddingVertical:10,
        backgroundColor: 'white',
        margin: 2,
        borderRadius: 8
    },
    itemImg : {
        width: '30%',
        height: 100
    },
    itemDesc:{
        padding: 4,
        width: '70%',
        // alignItems: 'center' 
    },
    title : {
        fontSize: 20,
        fontWeight: "700"
    },
    lastRow : {
        flexDirection : 'row',
        justifyContent: 'space-between'
    },
    category:{
        flexDirection: 'column',
    },  
    price : {
        fontSize: 20,
        flexDirection: 'column',
        textAlign: 'right',
    },
})