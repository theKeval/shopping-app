import { StyleSheet, Text, View , Image,TouchableOpacity} from 'react-native'
import React, {useState} from 'react'
import Logo from '../assets/mango_letter.png';
import MangoStyles from '../styles'
import { ButtonMain } from '../components';

const ItemDetailsScreen = ({ navigation, route }) => {
  const [qty, qtySet] = useState(1);
  React.useLayoutEffect(() => {
    navigation.setOptions({tabBarStyle: {display: 'none'}, title : route.params.item.name});
  })
  const onPressAdd = () => {
    // #TODO: Add Functionality to add
  } 
  return (
    <View style={styles.container}>
        <Image resizeMode="contain"
        style={styles.itemImg}
        source={Logo}
      />
      <View>
        <Text style={styles.label}>Category</Text>
        <Text>{route.params.item.category}</Text>

      </View>
      <View>
        <Text style={styles.label}>Description</Text>
        <Text>{route.params.item.description}</Text>
      </View>
      <View style={styles.twoColumns}>
        <Text style={styles.label}>Price</Text>
        <Text style={styles.price}>$ {route.params.item.price}</Text>
      </View>


      <View>
        <Text style={styles.label}>Quantity</Text>

      </View>
      <View style={styles.twoColumns}>
        <ButtonMain width='20%' title='-' backgroundColor={MangoStyles.mangoNegativeAction} onPress={()=> { qtySet(qty > 1 ? parseInt(qty) - 1 : 0) }}></ButtonMain>
        <Text style={styles.qtyLabel}>{qty}</Text>
        <ButtonMain width='20%' title='+' backgroundColor={MangoStyles.mangoPositiveAction} onPress={()=> { qtySet(parseInt(qty) + 1) }}></ButtonMain>

      </View>
      <View style={styles.btnAdd2Cart}>
        <ButtonMain  title='Add Item'></ButtonMain>
      </View>
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
    marginTop: 40,
    
  }
})