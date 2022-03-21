import { StyleSheet, Text, View , Image,TouchableOpacity, Alert} from 'react-native'
import React, {useState,useContext,useEffect} from 'react'
import Logo from '../assets/mango_letter.png';
import MangoStyles from '../styles'
import { Ionicons,FontAwesome5,AntDesign,Entypo,Fontisto,MaterialIcons} from '@expo/vector-icons';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import { GetUserInfo , getProduct,addItemToShoppingCart,getAsyncUser} from '../FirebaseConfig/FirebaseOperations';
import { CommonActions } from '@react-navigation/native';

const ItemDetailsScreen = ({ navigation, route }) => {
  const { user } = useContext(AuthenticatedUserContext) ;
  const [qty, qtySet] = useState(1);
  const [userInfo, userInfoSet] = useState(null)
  const [product, productSet] = useState({})
  const productId =  route.params && route.params.id !== null ?  route.params.id : null;

  useEffect(() => {
      

    getProduct(productId).then(productFound => {
      productSet({...productFound})
    }).catch()
    
    return () => {
    }
  }, [user])
  
  
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title : product.name,
      
      headerRight: () => user && user.isAdmin ? (
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
    Alert.alert("Item added to your shopping list!");
    addItemToShoppingCart(product,qty,user.id)
    navigation.dispatch(CommonActions.goBack());
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

      {user && !user.isAdmin  ? 
        <View>
          <View>
            <Text style={styles.label}>Quantity</Text>

          </View>
          <View style={styles.twoColumns}>
          <TouchableOpacity style={[{paddingVertical:5, width:'15%',backgroundColor:MangoStyles.mangoNegativeAction}]} onPress={()=> { qtySet(qty > 1 ? parseInt(qty) - 1 : 1) }}>
             <Text style={[{color:'white',textAlign:'center',fontSize:30,textAlignVertical:'center'}]}>-</Text>
          </TouchableOpacity>
            <Text style={styles.qtyLabel}>{qty}</Text>
          <TouchableOpacity style={[{paddingVertical:5, width:'15%',backgroundColor:MangoStyles.mangoPositiveAction}]}  onPress={()=> { qtySet(parseInt(qty) + 1) }}>
             <Text style={[{color:'white',textAlign:'center',fontSize:30,textAlignVertical:'center'}]}>+</Text>
          </TouchableOpacity>
          </View>
          <View style={styles.twoColumns}>
            <Text style={styles.label}>Total</Text>
            <Text style={styles.price}>$ {(parseFloat(product.price)* qty).toFixed(2).toString()}</Text>
          </View>

          <TouchableOpacity style={styles.button} onPress={onPressAdd}>
             <Text style={styles.buttonText}>Add Item</Text>
          </TouchableOpacity>
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
  },
  
  button: {
    marginTop:10,
    padding:10,
    width: '100%',
    alignItems: 'center',
    backgroundColor: MangoStyles.mangoOrangeYellow,
    borderRadius: 8
  },

  buttonText: {
    fontSize:20,
    color: 'white',
    fontWeight:'700'
  },

})