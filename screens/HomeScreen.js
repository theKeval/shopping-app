import React, { useContext, useState,useEffect } from 'react';
import { StyleSheet, View, FlatList,  Text,TouchableOpacity } from 'react-native';
import { Ionicons} from '@expo/vector-icons';
import MangoStyles from '../styles';

import Firebase from '../FirebaseConfig/Config'
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import ProductListItem from '../components/ProductListItem';
import { getAllProducts, GetUserInfo } from '../FirebaseConfig/FirebaseOperations';

const auth = Firebase.auth();

export default function HomeScreen({navigation, route}) {
  const { user } = useContext(AuthenticatedUserContext);
  const [userInfo, userInfoSet] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [isAdmin, isAdminSet] = useState(false)
  const [products, productsSet] = useState([]);
  let filters = {
    selectedItems: [],
    searchText: '',
    maxPrice: 0,
    minPrice: 100,
  };
  useEffect(() => {
    console.log('executo1 ' , user !=null)
    if(user && user.email && user.email  != ''){
      console.log('executo3 ' , user.email)
      
        GetUserInfo(user.email).then(userResponse =>{
          userInfoSet(userResponse); 
          console.log('got user')
        })
    }
    getAllProducts().then(response => {
      productsSet(response) 
      console.log('got products')
    })
    
    return () => {
      console.log('executo2')
    }
  }, [user])
  
  useEffect(() => {
    // if(route.params && route.params.filters){
    //   filters =  {
    //       selectedItems:route.params.filters.selectedItems,
    //       searchText:route.params.filters.searchText,
    //       maxPrice:route.params.filters.maxPrice,
    //       minPrice:route.params.filters.minPrice,
    //   };
  
    // }

    


  }, [])

  React.useLayoutEffect(() => {

    navigation.setOptions({
      headerRight: () => ( 
        <TouchableOpacity onPress={() => navigation.navigate('FilterModalScreen', filters)}>
          <Text style={styles.searchBtn}>
            <Ionicons name='search' size={20} color='white' />
          </Text>
        </TouchableOpacity> 
      ),
      headerLeft: () => ( user && userInfo && userInfo.isAdmin   ?
        <TouchableOpacity onPress={() => {
            navigation.navigate('EditProductScreen', { id: null })
          }
        }>
          <Text style={styles.searchBtn}>
            <Ionicons name='add-circle-outline' size={24} color='white' />;
          </Text>
        </TouchableOpacity> : <View />
      ),
    });
  }, [navigation]);
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
