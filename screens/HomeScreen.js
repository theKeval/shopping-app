import React, { useContext, useState } from 'react';
import { render } from 'react-dom';
import { StyleSheet, View, FlatList,  Text,StatusBar } from 'react-native';

import { IconButton } from '../components';
import Firebase from '../FirebaseConfig/Config'
import { Create, Update } from '../FirebaseConfig/FirebaseOperations';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import  HeaderComponents from './HeaderComponents';
import BottomComponents from './BottomComponents';
import ProductListItem from '../components/ProductListItem';

const auth = Firebase.auth();

export default function HomeScreen({navigation}) {
  const { user } = useContext(AuthenticatedUserContext);
  const [selectedId, setSelectedId] = useState(null);

  const selectItem = (item) =>{
    setSelectedId(item.id);
    navigation.navigate('ItemDetailsScreen', {
      item : item
    })     
  }
  // Create({
  //   email: user.email,
  //   id: user.uid,
  // })
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      name: 'Mango Cake',
      description: '4 layers mango cake',
      price: 12.75
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      name: 'Mango Tea',
      description: 'Cool mango tea, no sugar',
      price: 7.58
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      name: 'Mango Coffee',
      description: 'Mango Frappe',
      price: 10.34
    },
  ];
  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = ({ item }) => (
    <ProductListItem item={item} onPress={() => {selectItem(item)}}></ProductListItem>
  );
     return (
      
        <View style ={styles.container}>
         {/* <View style={styles.row}>
            <Text style={styles.title}>Welcome {user.email}!</Text>
            <IconButton
            name='logout'
            size={24}
            color='#fff'
            onPress={handleSignOut}
            />
          </View> */}
          <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
          {/* <Text style={styles.text}>Your UID is: {user.uid} </Text> */}
        </View>
        
    );
    
}

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
  }
});
