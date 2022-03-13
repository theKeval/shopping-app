import { StyleSheet, Text, View,TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Logo from '../assets/mango_letter.png';
const ProductListItem = ({ item, onPress, backgroundColor }) => {

    

  return (
    <TouchableOpacity onPress={onPress} style={[styles.item]}>
         <Image resizeMode="contain"
        style={styles.itemImg}
        source={Logo}
      />
        <View style={styles.itemDesc}>
            <Text style={[styles.title]}>{item.name}</Text>
            <Text style={[styles.description]}>{item.description}</Text>
            <View style={[styles.lastRow]}>
                <Text style={[styles.category]}>{item.category}</Text>
                <Text style={[styles.price]}>{'$' + item.price.toString()}</Text>
            </View>
        </View>
    </TouchableOpacity>
  )
}

export default ProductListItem

const styles = StyleSheet.create({

    item:{
        flexDirection : 'row',
        paddingHorizontal: 5,
        paddingVertical:10
    },
    itemImg : {
        width: '30%',
        height: 100
    },
    itemDesc:{
        padding: 5,
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
    price : {
        width: '50%',
        marginTop: 20,
        textAlign: 'right'
    },
})