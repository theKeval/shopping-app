import { StyleSheet, Text, View,FlatList,TouchableOpacity,useWindowDimensions,Alert  } from 'react-native'
import React,{useState} from 'react'
import MangoStyles from '../styles';
import { Ionicons} from '@expo/vector-icons';
import moment from 'moment';
import { updateOrderState,updateCategory,getAllCategories,getAsyncUser,removeCategory, getAllOrders } from '../FirebaseConfig/FirebaseOperations';
import { CommonActions } from '@react-navigation/native';

const OrderDetailsScreen =  ({ navigation, route })  => {
  const { screen } = useWindowDimensions();
  const [orderDetailObj, orderDetailObjSet] = useState(null);
  const [isAdmin, isAdminSet] = useState(false);
  const changeOrderState = (newStatus)=>{
    
    Alert.alert( "Change order status?", "Do you set the status as '" +  newStatus.replace(/-/g,' ').toUpperCase() +"'?",
      [
        {
          text: "Cancel",onPress: () => {},style: "destructive",},
        {
          text: "Accept",
          onPress: () => {
            updateOrderState(orderDetailObj.id,newStatus)
            let neworderDetail = {...orderDetailObj}
            neworderDetail.status = newStatus
            orderDetailObjSet(neworderDetail)
          },
          style: "default",
        },
      ],
      {
        cancelable: true,
      })
  }
    React.useEffect(()=>{
      getAsyncUser().then((userResponse)=>{
        isAdminSet(userResponse.isAdmin)
        if(orderDetailObj === null){

          let order = route.params.order
          order.dateString = moment(order.date).format('DD/MM/YYYY');
          order.taxes = parseFloat(parseFloat(order.total) * 0.13);
          order.shipping = parseFloat(parseFloat(order.total) * 0.10);
          order.net = parseFloat(parseFloat(order.total) + order.taxes + order.shipping);
          orderDetailObjSet(order)
        }
      })
    })
    React.useLayoutEffect(() => {
        
        navigation.setOptions({ title : 'Order ' + route.params.order.title,
        headerRight: () => {
          if(isAdmin && orderDetailObj && orderDetailObj.status === 'pending'){
            return (
              <TouchableOpacity onPress={() => {changeOrderState('ready-for-shipment')}}>
                <Text style={styles.searchBtn}>
                  <Ionicons name='checkmark' size={20} color='white' />
                </Text>
              </TouchableOpacity> 
            )
          }else if(isAdmin && orderDetailObj && orderDetailObj.status === 'ready-for-shipment'){
            return (
              <TouchableOpacity onPress={() => {changeOrderState('shipped')}}>
              <Text style={styles.searchBtn}>
                <Ionicons name='airplane' size={20} color='white' />
              </Text>
            </TouchableOpacity> 
            )
          }else if(isAdmin && orderDetailObj && orderDetailObj.status === 'shipped'){
            return (
              <TouchableOpacity onPress={() => {changeOrderState('completed')}}>
              <Text style={styles.searchBtn}>
                <Ionicons name='checkmark-done' size={20} color='white' />
              </Text>
            </TouchableOpacity> 
            )
          }else{
            return  (<View/>)
            
          }

        }
      });
      })
  return orderDetailObj ? (
    <View style={styles.container}>
      <View styles={styles.orderHeader}>
          <View style={styles.row}>
              <Text style={styles.label}>Status: </Text>
              <Text style={[styles.value,{fontStyle:'italic'}]}>{orderDetailObj.status.replace(/-/g,' ').toUpperCase()}</Text>
          </View>
          <View style={styles.row}>
              <Text style={styles.label}>Date Created: </Text>
              <Text style={styles.value}>{orderDetailObj.dateString}</Text>
          </View>
          <View style={styles.row}>
              <Text style={styles.label}>Subtotal: </Text>
              <Text style={styles.value}>${parseFloat(orderDetailObj.total).toFixed(2)}</Text>
          </View>
          <View style={styles.row}>
              <Text style={styles.label}>Taxes (13%): </Text>
              <Text style={styles.value}>${parseFloat(orderDetailObj.taxes).toFixed(2)}</Text>
          </View>
          <View style={styles.row}>
              <Text style={styles.label}>Shipping Cost (10%): </Text>
              <Text style={styles.value}>${parseFloat(orderDetailObj.shipping).toFixed(2)}</Text>
          </View>
          <View style={styles.row}>
              <Text style={styles.label}>Total: </Text>
              <Text style={styles.value}>${parseFloat(orderDetailObj.net).toFixed(2)}</Text>
          </View>
          <View style={[styles.row,{marginTop: 10} ]}>
              <Text style={styles.label}>Your Items: </Text>
          </View>
          <View
              style={{
                  borderBottomColor: 'black',
                  borderBottomWidth: 1,
                  width:'100%',
                  marginBottom: 10
              }}
              />
          <FlatList 
              data={orderDetailObj.items}
              renderItem={({x,item,index}) => {
                  return (
                      <View style={styles.listItem}>
                          <View>
                              <Text style={styles.name}>{item.name} </Text>
                              <Text style={styles.values}>${parseFloat(item.price).toFixed(2)}  (x{parseInt(item.quantity)}) </Text>
                          </View>
                          <View>
                              <Text style={styles.total}>${parseFloat(parseFloat(item.price) * parseInt(item.quantity)).toFixed(2)}  </Text>
                          </View>
                      </View> 
                  )}}
              keyExtractor={(item,index) => index}
          /> 
      </View>

    </View>

    
  ) : <View />
}

export default OrderDetailsScreen

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: MangoStyles.mangoPaleOrange,
      paddingHorizontal: 10,
      paddingTop:10
    },
    noList:{
        width: '100%',
        height:'100%',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontStyle: 'italic'
        
      },
    orderHeader:{
        width: '100%',

    },
    row:{
      paddingVertical: 5,
      flexDirection:'row',
      justifyContent: 'space-between'
    },
    label:{
      fontSize: 16,
      fontWeight: '700',
      width: '50%',
    },
    value:{
      fontSize: 16,
      width: '50%',
      textAlignVertical: 'center',
      textAlign: 'right'
    },
    listItem:{
      paddingHorizontal: 10,
      paddingVertical: 5,
      flexDirection:'row',
      alignItems: 'stretch',
      justifyContent: 'space-between'
    },
    name:{
      fontSize: 18,
    },
  values:{
      fontSize: 16,
      
  },
  total:{
      fontSize: 25,
      textAlignVertical: 'center',
      textAlign:'right'
  },
  searchBtn:{
      marginHorizontal: 10,
      padding: 5
  }
})