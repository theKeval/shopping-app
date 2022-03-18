import { StyleSheet, View, FlatList,  Text,StatusBar,Button,TouchableOpacity } from 'react-native';
import { Ionicons,FontAwesome5,AntDesign,Entypo,Fontisto,MaterialIcons} from '@expo/vector-icons';
import React, {useState} from 'react'
import MangoStyles from '../styles'
import OrderListitem from '../components/OrderListitem'
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';


const OrdersScreen = ({navigation}) => {
  const selectOrder = (order) => {
    navigation.navigate('OrderDetailsScreen', {
      order : order
    })     
  }
  const [visible, setVisible] = useState(false);
  const [filterOrders, filterOrdersSet] = useState('all');
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Order 00001',
      status: 'Pending',
      date: new Date(),
      total: 12.75,
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Order 00002',
      status: 'Pending',
      date: new Date(),
      total: 12.75,
    },
    {
      id: 'bd7acbea-c2b1-46c2-aed5-3ad53abb28ba',
      title: 'Order 00003',
      status: 'Completed',
      date: new Date(),
      total: 12.75,
    },
  ];
  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      tabBarStyle: {display: 'none'},
      
      headerRight: () => {
        return (
          <View style={{ height: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <Menu
              visible={visible}
              anchor={<Text style={styles.searchBtn} onPress={showMenu}><Ionicons name='ellipsis-vertical' size={24} color='white' /></Text>}
              onRequestClose={hideMenu}
            >
              <MenuItem style={[{backgroundColor : filterOrders === 'all' ? MangoStyles.mangoOrangeYellow : 'white'}]} 
              textStyle={[{color : filterOrders === 'all' ? 'white' : 'black'}]} onPress={ () => {filterOrdersSet('all');hideMenu();}}>All</MenuItem>
              <MenuItem style={[{backgroundColor : filterOrders === 'pending' ? MangoStyles.mangoOrangeYellow : 'white'}]}
                textStyle={[{color : filterOrders === 'pending' ? 'white' : 'black'}]} onPress={ () => {filterOrdersSet('pending');hideMenu();}}>Pending</MenuItem>
              <MenuItem style={[{backgroundColor : filterOrders === 'completed' ? MangoStyles.mangoOrangeYellow : 'white'}]} 
              textStyle={[{color : filterOrders === 'completed' ? 'white' : 'black'}]}
              onPress={ () => {filterOrdersSet('completed');hideMenu();}}>Completed</MenuItem>
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
            data={DATA}
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
