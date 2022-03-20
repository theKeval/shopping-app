import React, { useContext, useState,useEffect } from 'react';
import { StyleSheet, View, FlatList,  Text,TouchableOpacity } from 'react-native';
import { Ionicons} from '@expo/vector-icons';
import MangoStyles from '../styles';

import Firebase from '../FirebaseConfig/Config'
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import ProductListItem from '../components/ProductListItem';
import { getAllProducts, GetUserInfo,getAsyncUser } from '../FirebaseConfig/FirebaseOperations';

const auth = Firebase.auth();

export default function HomeScreen({navigation, route}) {
  const { user } = useContext(AuthenticatedUserContext);
  const [selectedId, setSelectedId] = useState(null);
  const [products, productsSet] = useState([]);
  let filters = {
    selectedItems: [],
    searchText: '',
    maxPrice: 0,
    minPrice: 100,
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getAllProducts().then(response => {
        productsSet(response) 
        
      })
      getAsyncUser().then((userResponse)=>{
        console.log('got products')
        setHeaderLayout(userResponse && userResponse.isAdmin)
      }).catch(()=>{
         setHeaderLayout(false);
      })
      
    });

    return unsubscribe;
  }, [navigation]);


  const setHeaderLayout = (isAdmin) => {
    navigation.setOptions({
      headerRight: () => ( 
        <TouchableOpacity onPress={() => navigation.navigate('FilterModalScreen', filters)}>
          <Text style={styles.searchBtn}>
            <Ionicons name='search' size={20} color='white' />
          </Text>
        </TouchableOpacity> 
      ),
      headerLeft: () => ( isAdmin   ?
        <TouchableOpacity onPress={() => {
            navigation.navigate('EditProductScreen', { id: null })
          }
        }>
          <Text style={styles.searchBtn}>
            <Ionicons name='add-circle-outline' size={24} color='white' />;
          </Text>
        </TouchableOpacity> : <View />
      ),
    })
  }

  const selectItem = (item) =>{
    setSelectedId(item.id);
    navigation.navigate('ItemDetailsScreen', {
      id : item.id
    })     
  }


     return (
      
        <View style ={styles.container}>

          <FlatList
            data={products}
            renderItem={({ item }) => (
              <ProductListItem item={item} onPress={() => {selectItem(item)}}></ProductListItem>
            )}
            keyExtractor={item => item.id}
          />
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
  },
  searchBtn: {
    marginHorizontal: 10,
    padding: 5
  }
});
