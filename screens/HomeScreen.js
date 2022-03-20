import React, { useContext, useState,useEffect } from 'react';
import { StyleSheet, View, FlatList,  Text,TouchableOpacity } from 'react-native';
import { Ionicons} from '@expo/vector-icons';
import MangoStyles from '../styles';
import Prompt from 'react-native-prompt-crossplatform';
import Firebase from '../FirebaseConfig/Config'
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import ProductListItem from '../components/ProductListItem';
import { getAllProducts, GetUserInfo,getAsyncUser } from '../FirebaseConfig/FirebaseOperations';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';

const auth = Firebase.auth();

export default function HomeScreen({navigation, route}) {
  const { user } = useContext(AuthenticatedUserContext);
  const [selectedId, setSelectedId] = useState(null);
  const [categoryId, categoryIdSet] = useState('');
  const [products, productsSet] = useState([]);
  const [promptVisible,promptVisibleSet] = useState(false)
  const [promptText,promptTextSet] = useState('')
  const [searchTerm,searchTermSet] = useState('')

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      
      if(route.params && route.params.catId){
        categoryIdSet(route.params.catId)
      }
      getViewProducts()
      navigation.setOptions({
        headerRight: () => ( 
          <TouchableOpacity onPress={() => {promptVisibleSet(true)}}>
            <Text style={styles.searchBtn}>
              <Ionicons name='search' size={20} color='white' />
            </Text>
          </TouchableOpacity> 
        ),
        // headerLeft: () => ( isAdmin   ?
        //   <TouchableOpacity onPress={() => {
        //       navigation.navigate('EditProductScreen', { id: null })
        //     }
        //   }>
        //     <Text style={styles.searchBtn}>
        //       <Ionicons name='add-circle-outline' size={24} color='white' />;
        //     </Text>
        //   </TouchableOpacity> : <View />
        // ),
      })
      // getAsyncUser().then((userResponse)=>{
      //   setHeaderLayout(userResponse && userResponse.isAdmin)
      // }).catch(()=>{
      //    setHeaderLayout(false);
      // })
      
    });

    return unsubscribe;
  }, [navigation]);

  const getViewProducts = () => {
    getAllProducts().then(response => {
      console.log('categoryId',categoryId)
      productsSet(response.filter(prod => { 
        if(searchTerm !== ''){
          return prod.categoryId === route.params.catId && 
          (prod.name.indexOf(searchTerm) > -1 || prod.description.indexOf(searchTerm) > -1)
        }else{
          return prod.categoryId === route.params.catId
        }
      })) 
      
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

            <Prompt
              title=  {"Search"}
              inputPlaceholder={""}
              defaultValue={searchTerm}
              isVisible={promptVisible}
              onChangeText={(text) => {promptTextSet(text)}}
              onCancel={() => {promptVisibleSet(false)}}
              onSubmit={() => {searchTermSet(promptText);promptTextSet('');promptVisibleSet(false);getViewProducts()}}
            />
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
