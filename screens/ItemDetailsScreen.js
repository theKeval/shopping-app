import { StyleSheet, Text, View , Image,TouchableOpacity} from 'react-native'
import React, {useState,useContext,useEffect} from 'react'
import Logo from '../assets/mango_letter.png';
import MangoStyles from '../styles'
import { ButtonMain } from '../components';
import { Ionicons,FontAwesome5,AntDesign,Entypo,Fontisto,MaterialIcons} from '@expo/vector-icons';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import { GetUserInfo , getProduct,addItemToShoppingCart} from '../FirebaseConfig/FirebaseOperations';

const ItemDetailsScreen = ({ navigation, route }) => {
  const { user } = useContext(AuthenticatedUserContext) ;
  const [qty, qtySet] = useState(1);
  const [userInfo, userInfoSet] = useState(null)
  const [product, productSet] = useState({})
  const productId =  route.params && route.params.id !== null ?  route.params.id : null;

  useEffect(() => {
    if(user && user.email && user.email  != ''){
      
        GetUserInfo(user.email).then(userResponse =>{
          userInfoSet(userResponse); 
        })
    }
    getProduct(productId).then(productFound => {
      productSet({...productFound})
    }).catch()
    
    return () => {
    }
  }, [user])
  
  
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title : product.name,
      
      headerRight: () => userInfo && userInfo.isAdmin ? (
        <TouchableOpacity onPress={() => {
            navigation.navigate('EditProductScreen', { 
              id: productId
            })
          }
        }>
          <Text style={styles.searchBtn}>
            <Ionicons name='pencil' size={24} color='white' />
          </Text>
        </TouchableOpacity>
      ) : (<View/>),
    });
  })
  const onPressAdd = () => {
    addItemToShoppingCart(product,qty,userInfo.id)
  } 


  return (
    <View style={styles.container}>
        <Image resizeMode="contain"
        style={styles.itemImg}
        source={Logo}
      />
      <View>
        <Text style={styles.label}>Category</Text>
        <Text>{product.categoryName}</Text>

      </View>
      <View>
        <Text style={styles.label}>Description</Text>
        <Text>{product.description}</Text>
      </View>
      <View style={styles.twoColumns}>
        <Text style={styles.label}>Price</Text>
        <Text style={styles.price}>$ {parseFloat(product.price).toString()}</Text>
      </View>

      {user ? 
        <View>
          <View>
            <Text style={styles.label}>Quantity</Text>

          </View>
          <View style={styles.twoColumns}>
            <ButtonMain width='20%' title='-' backgroundColor={MangoStyles.mangoNegativeAction} onPress={()=> { qtySet(qty > 1 ? parseInt(qty) - 1 : 1) }}></ButtonMain>
            <Text style={styles.qtyLabel}>{qty}</Text>
            <ButtonMain width='20%' title='+' backgroundColor={MangoStyles.mangoPositiveAction} onPress={()=> { qtySet(parseInt(qty) + 1) }}></ButtonMain>

          </View>
          <View style={styles.twoColumns}>
            <Text style={styles.label}>Total</Text>
            <Text style={styles.price}>$ {(parseFloat(product.price)* qty).toString()}</Text>
          </View>
          <View style={styles.btnAdd2Cart}>
            <ButtonMain  onPress={onPressAdd} title='Add Item'></ButtonMain>
          </View> 

        </View> 

      : <View />}

    </View>
  )
}

export default ItemDetailsScreen

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
    marginTop: 10,
    
  },
  searchBtn: {
    marginHorizontal: 10,
    padding: 5
  }
})