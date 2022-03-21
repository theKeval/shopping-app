import { StyleSheet, View, FlatList,  Text,StatusBar,Button,TouchableOpacity } from 'react-native';
import { Ionicons,FontAwesome5,AntDesign,Entypo,Fontisto,MaterialIcons} from '@expo/vector-icons';
import React, {useState} from 'react'
import MangoStyles from '../styles'
import OrderListitem from '../components/OrderListitem'
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { getUserOrders,getAsyncUser, getAllOrders } from '../FirebaseConfig/FirebaseOperations';
import moment from 'moment';


const OrdersScreen = ({navigation}) => {
  const selectOrder = (order) => {
    navigation.navigate('OrderDetailsScreen', {
      order : order
    })     
  }
  const [userOrders, userOrdersSet] = useState([]);
  const [visible, setVisible] = useState(false);
  const [isAdmin, isAdminSet] = useState(false);
  const [userID, userIDSet] = useState(false);
  const [filterOrders, filterOrdersSet] = useState('all');

  const hideMenu = () => setVisible(false);
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {

        try {
            getAsyncUser().then((userResponse)=>{
              isAdminSet(userResponse && userResponse.isAdmin)
              userIDSet(userResponse.id)
              updateOrders(userResponse && userResponse.isAdmin)
            })
        } catch (error) {
            console.log(error)
            // setHeaderLayout(false)

        }
        
    });

    return unsubscribe;
  }, [navigation]);
  const showMenu = () => setVisible(true);
  const updateOrders = (isAdminFlag) => {

    if(isAdminFlag){
      getAllOrders(filterOrders).then((orders)=>{
        userOrdersSet(orders.map(order => {
          order.dateFormat = moment(order.date).format('DD/MM/YYYY')
          return order;
        }))
      })
    }else{
      getUserOrders(userID,filterOrders).then((orders)=>{
        userOrdersSet(orders.map(order => {
          order.dateFormat = moment(order.date).format('DD/MM/YYYY')
          return order;
        }))
      })
    }

  };
  React.useLayoutEffect(() => {
    navigation.setOptions({
      
      headerRight: () => {
        return (
          <View style={{ height: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <Menu
              visible={visible}
              anchor={<Text style={styles.searchBtn} onPress={showMenu}><Ionicons name='ellipsis-vertical' size={24} color='white' /></Text>}
              onRequestClose={hideMenu}
              style={{width: 200}}
            >
              <MenuItem style={[{backgroundColor : filterOrders === 'all' ? MangoStyles.mangoOrangeYellow : 'white'}]} 
              textStyle={[{color : filterOrders === 'all' ? 'white' : 'black'}]} onPress={ () => {filterOrdersSet('all');updateOrders(isAdmin);hideMenu();}}>All</MenuItem>
              <MenuItem style={[{backgroundColor : filterOrders === 'pending' ? MangoStyles.mangoOrangeYellow : 'white'}]}
                textStyle={[{color : filterOrders === 'pending' ? 'white' : 'black'}]} onPress={ () => {filterOrdersSet('pending');updateOrders(isAdmin);hideMenu();}}>Pending</MenuItem>
              <MenuItem style={[{backgroundColor : filterOrders === 'ready-for-shipment' ? MangoStyles.mangoOrangeYellow : 'white'}]} 
              textStyle={[{color : filterOrders === 'ready-for-shipment' ? 'white' : 'black'}]}
              onPress={ () => {filterOrdersSet('ready-for-shipment');updateOrders(isAdmin);hideMenu();}}>Ready for shippment</MenuItem>
              <MenuItem style={[{backgroundColor : filterOrders === 'shipped' ? MangoStyles.mangoOrangeYellow : 'white'}]} 
              textStyle={[{color : filterOrders === 'shipped' ? 'white' : 'black'}]}
              onPress={ () => {filterOrdersSet('shipped');updateOrders(isAdmin);hideMenu();}}>Shipped</MenuItem>
              <MenuItem style={[{backgroundColor : filterOrders === 'completed' ? MangoStyles.mangoOrangeYellow : 'white'}]} 
              textStyle={[{color : filterOrders === 'completed' ? 'white' : 'black'}]}
              onPress={ () => {filterOrdersSet('completed');updateOrders(isAdmin);hideMenu();}}>Completed</MenuItem>
            </Menu>
          </View>
      )},
    })
  })
  const renderItem = ({ item }) => (
    <OrderListitem item={item} onPress={() => {selectOrder(item)}}></OrderListitem>
  );
     return (
      
        <View style ={styles.container}>
          <FlatList
            data={userOrders}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>
        
    );
    
}

export default OrdersScreen


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MangoStyles.mangoPaleOrange,
    paddingHorizontal: 0,
    paddingTop:10
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 20
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    bottom: 0
  },
  text: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#000'
  },
  searchBtn: {
    marginRight: 10,
    padding: 5
  }
});
