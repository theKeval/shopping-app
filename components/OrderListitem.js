import { StyleSheet, Text, View,TouchableOpacity, Image } from 'react-native'
import React from 'react'
import moment from 'moment';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

const OrderListitem = ({ item, onPress, backgroundColor }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.item]}>
        <View style={styles.itemDescLeft}>
            <Text style={[styles.title]}>Order {item.title}</Text>
            <Text >{item.dateFormat}</Text>

        </View>
        <View style={styles.itemDescRight}>

            <Text style={[styles.status]}>{item.status.toUpperCase()}</Text>
            <Text style={[styles.price]}>{'$ ' + parseFloat(item.total).toFixed(2)}</Text>
        </View>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({

  item:{
      flexDirection : 'row',
      paddingHorizontal: 10,
      paddingVertical:4,
      backgroundColor: 'white',
      margin: 3,
      borderRadius: 8
  },
  itemDescLeft:{
      padding: 5,
      width: '50%',
      // alignItems: 'center' 
  },
  itemDescRight:{
      padding: 5,
      width: '50%',
      // alignItems: 'center' 
  },
  title : {
      fontSize: 22,
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
      fontSize: 25,
      flexDirection: 'column',
      textAlign: 'right'
  },
  status:{
      fontStyle:'italic',
    textAlign: 'right'
  }
})
export default OrderListitem