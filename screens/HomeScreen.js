import React, { useContext, useState,useEffect } from 'react';
import { StyleSheet, View, FlatList,  Text,TouchableOpacity } from 'react-native';
import { Ionicons} from '@expo/vector-icons';
import MangoStyles from '../styles';
import Prompt from 'react-native-prompt-crossplatform';
import Firebase from '../FirebaseConfig/Config'
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import ProductListItem from '../components/ProductListItem';
import { getAllProducts, getAsyncUser } from '../FirebaseConfig/FirebaseOperations';
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
  const [visible, setVisible] = useState(false);

  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);

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
              <MenuItem style={[{backgroundColor : 'white'}]}  textStyle={[{color :  'black' }]} 
              onPress={ () => {promptVisibleSet(true);hideMenu()}}>
                <Ionicons name='search' size={20} color='black' /> Search
              </MenuItem>
              {user && user.isAdmin ? <MenuItem style={[{backgroundColor : 'white', }]}  textStyle={[{color :  'black',  }]} 
              onPress={ () => { navigation.navigate('EditProductScreen', { id: null });hideMenu()}}>
                <Ionicons name='add-circle-outline' size={20} color='black' /> Add Item 
              </MenuItem> : null}
            </Menu>
          </View>
      )},
    })
  })
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      try {
        if(route.params && route.params.catId){
          categoryIdSet(route.params.catId)
        }
        getViewProducts(route.params && route.params.catId ? route.params.catId : '' , '')
      } catch (error) {
        console.log(error)
      }

      
    });

    return unsubscribe;
  }, [navigation]);

  const getViewProducts = (catId,searchTerm) => {
    getAllProducts().then(response => {
      productsSet(response.filter(prod => { 
        if(searchTerm !== ''){
          return prod.categoryId === catId && 
          (prod.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 || prod.description.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1)
        }else{
          return prod.categoryId === catId
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
              onSubmit={() => {searchTermSet(promptText);getViewProducts(categoryId,promptText);promptTextSet('');promptVisibleSet(false);}}
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
