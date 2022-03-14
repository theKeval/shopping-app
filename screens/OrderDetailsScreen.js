import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const OrderDetailsScreen =  ({ navigation, route })  => {
    React.useLayoutEffect(() => {
        navigation.setOptions({tabBarStyle: {display: 'none'}, title : route.params.order.title});
      })
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>Status</Text>
        <Text>{route.params.order.status}</Text>
      </View>
      <View>
        <Text style={styles.label}>Date</Text>
        <Text>{route.params.order.date.toString()}</Text>
      </View>
      <View style={styles.twoColumns}>
        <Text style={styles.label}>Total</Text>
        <Text style={styles.price}>$ {route.params.order.total}</Text>
      </View>

    </View>
  )
}

export default OrderDetailsScreen

const styles = StyleSheet.create({
    container: {
        fontSize: 18,
        flex: 1,
        backgroundColor: MangoStyles.mangoPaleOrange,
        paddingHorizontal: 0,
        paddingTop:10,
        paddingHorizontal:20
      },
      itemImg:{
        alignSelf: 'center',
        maxHeight: 200,
        maxWidth: '80%',
      },
      twoColumns:{
        marginTop: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection:'row'
      },
      price:{
        marginTop: 15,
        fontSize: 25
      },
      label : {
        fontSize: 18,
        fontWeight: '700',
        marginTop: 15,
        marginBottom: 5,
      },
      qtyLabel:{
        textAlign: 'center',
        fontSize: 20,
        alignContent: 'center'
    
      },
      btnAdd2Cart:{
        marginTop: 40,
        
      }
})