import { StyleSheet, Text, View,TouchableOpacity, Image } from 'react-native'
import React from 'react'

const OrderListitem = ({ item, onPress, backgroundColor }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.item]}>
        <View style={styles.itemDesc}>
            <Text style={[styles.title]}>{item.title}</Text>
            <Text >{item.status}</Text>
            <Text >{item.date.toString()}</Text>
            <Text style={[styles.price]}>{'$ ' + item.total.toString()}</Text>

        </View>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({

  item:{
      flexDirection : 'row',
      paddingHorizontal: 5,
      paddingVertical:10
  },
  itemDesc:{
      padding: 5,
      width: '100%',
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
      textAlign: 'right'
  },
})
export default OrderListitem