import { StyleSheet, Text, View,TextInput,TouchableOpacity } from 'react-native'
import { Ionicons,FontAwesome5,AntDesign,Entypo,Fontisto,MaterialIcons} from '@expo/vector-icons';
import React,{useState} from 'react'
import { Picker } from '@react-native-picker/picker';
import { CommonActions } from '@react-navigation/native';
import { ButtonMain } from '../components';

const EditProductScreen = ({navigation,route}) => {
    const productId =  route.params && route.params.id !== null ?  route.params.id : null;
    const [productName , productNameSet] = useState(route.params && route.params.productName !== null ?  route.params.productName : "");
    const [productDescription , productDescriptionSet] = useState(route.params && route.params.productDescription !== null ?  route.params.productDescription : "");
    const [productPrice , productPriceSet] = useState(route.params && route.params.productPrice !== null ?  route.params.productPrice.toString() : "");
    const [productCategory , productCategorySet] = useState("");



    React.useLayoutEffect(() => {
        navigation.setOptions({
            title : productId ? 'Edit Product' : 'Add Product' ,
            headerRight: () => {
                return  productId ? (
                <TouchableOpacity onPress={() => {}}>
                  <Text style={styles.searchBtn}>
                    <Ionicons name='trash' size={24} color='white' />
                  </Text>
                </TouchableOpacity> 
              ): (<View></View>)},
        });
    }, [navigation]);
    const categories = [{
        id: '92iijs7yta',
        name: 'Tea'
      }, {
        id: 'a0s0a8ssbsd',
        name: 'Cake'
      }, {
        id: '16hbajsabsd',
        name: 'Coffee'
      }
    ];

    const saveProduct = () => {
        if(productName.toString().length === 0){
            alert('Product Name field is empty!')
        }else if(productDescription.toString().length === 0){
            alert('Product Description field is empty!')
        }else if(productPrice.toString().length === 0){
            alert('Product Price field is empty!')
        }else if(productCategory.toString().length === 0){
            alert('Product Category field is empty!')
        }else{
            if(productId){
                navigation.dispatch(CommonActions.goBack());


            }else{
                navigation.navigate('HomeScreen')

            }
        }
    }   
    const renderCategoryList = () => {
        return categories.map((cat,i) => {
          return <Picker.Item key={cat.id} label={ cat.name} value={cat.id} />
        })
      }
  return (
    <View  style ={styles.container}>
      <View  style={styles.row}>
        <Text style={styles.label}>Product Name:</Text>
        <TextInput
          placeholder='Ex: tea'
          value={productDescription}
          onChangeText={text => productDescriptionSet(text)}
          style={[styles.textField]}
        />
      </View>
      <View  style={styles.row}>
        <Text style={styles.label}>Product Price:</Text>
        <TextInput keyboardType='number-pad'
          placeholder='ex: 12.00'
          value={productName}
          onChangeText={text => productNameSet(text)}
          style={[styles.textField]}
        />
      </View>
      <View  style={styles.row}>
        <Text style={styles.label}>Product Category:</Text>

        <Picker selectedValue={productCategory} onValueChange={textValue => productCategorySet(textValue)} style={styles.field} itemStyle={styles.field}>
                {renderCategoryList()}
        </Picker>
      </View>
      <View  style={styles.row}>
        <Text style={styles.label}>Product Description:</Text>
        <TextInput
          placeholder='Ex: mango tea'
          value={productPrice}
          multiline={true}
          numberOfLines={3}
          onChangeText={text => productPriceSet(text)}
          style={[styles.textField,{textAlignVertical:'top'}]}
        />
      </View>
      <View style={styles.btnSave}>
        <ButtonMain  onPress={() => saveProduct()} title='Save Item'></ButtonMain>
      </View>
    </View>
  )
}

export default EditProductScreen


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: MangoStyles.mangoPaleOrange,
        paddingHorizontal: '5%',
        paddingTop:10
    },
    row:{
        justifyContent: 'center',
        marginTop: 10,
    },
    label:{
        textAlign: 'left',
        fontWeight: '700',
        marginBottom: 5,
        fontSize: 16,
        
    },
    textField:{

        
        // padding: 12,
        backgroundColor: 'white',
        borderColor: MangoStyles.mangoOrangeYellow,
        borderWidth: 2,
        borderRadius: 5,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    field:{
        backgroundColor: 'white',
        borderColor: MangoStyles.mangoOrangeYellow,
        borderWidth: 2,
        borderRadius: 5,
        paddingVertical: 10,
    },
    searchBtn: {
        marginHorizontal: 10,
        padding: 5
      },
      btnSave: {
          marginTop:20,
      }
})