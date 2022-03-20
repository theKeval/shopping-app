import { StyleSheet, Text, View,TextInput,TouchableOpacity } from 'react-native'
import { Ionicons,FontAwesome5,AntDesign,Entypo,Fontisto,MaterialIcons} from '@expo/vector-icons';
import React,{useState,useEffect} from 'react'
import { Picker } from '@react-native-picker/picker';
import { CommonActions } from '@react-navigation/native';
import { ButtonMain } from '../components';
import MangoStyles from '../styles';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
// import SelectBox from 'react-native-multi-selectbox'
import { createProduct,updateProduct,getAllCategories,getProduct,removeProduct } from '../FirebaseConfig/FirebaseOperations';

const EditProductScreen = ({navigation,route}) => {
    const productId =  route.params && route.params.id !== null ?  route.params.id : null;
    const [productName , productNameSet] = useState( null);
    const [productDescription , productDescriptionSet] = useState( null);
    const [productPrice , productPriceSet] = useState( null);
    const [productCategory , productCategorySet] = useState(null);
    const [categories , categoriesSet] = useState([]);


    useEffect(() => {
      getAllCategories().then(categoriesFound => {
        categoriesSet(categoriesFound)
        if(productId){
          getProduct(productId).then(productFound => {
            productNameSet(productFound.name)
            productDescriptionSet(productFound.description)
            productPriceSet(productFound.price)
            productCategorySet(categoriesFound.find(cat => cat.id === productFound.categoryId))
          }).catch()
        }

      }).catch()
      console.log('executo1 ' , productId)
      return () =>   {
        console.log('executo2')
      }
    }, [])
    
    React.useLayoutEffect(() => {
        navigation.setOptions({
            title : productId ? 'Edit Product' : 'Add Product' ,
            headerRight: () => {
                return  productId ? (
                <TouchableOpacity onPress={() => { deteleProduct()}}>
                  <Text style={styles.searchBtn}>
                    <Ionicons name='trash' size={24} color='white' />
                  </Text>
                </TouchableOpacity> 
              ): (<View />)},
        });
    }, [navigation]);


    const deteleProduct = () => {
      removeProduct(productId);
      navigation.navigate('HomeScreen')
    }
    const saveProduct = () => {
        if(!productName || productName === ''){
            alert('Product Name field is empty!')
        }else if(!productDescription || productDescription === ''){
            alert('Product Description field is empty!')
        }else if(!productPrice || productPrice === ''){
            alert('Product Price field is empty!')
        }else if(!productCategory || productCategory === ''){
            alert('Product Category field is empty!')
        }else{
          const product = {
            'name': productName,
            'description': productDescription,
            'price': productPrice,
            'categoryId': productCategory['id'],
            'categoryName': productCategory['name'],
         }
            if(productId){
              updateProduct(productId,{...product,id:productId})
                navigation.navigate('HomeScreen')
              
              
            }else{
              createProduct(product)
                navigation.dispatch(CommonActions.goBack());

            }
        }
    }   
    const renderCategoryList = () => {
        return categories.map((cat,i) => {
          return <Picker.Item key={cat.id} label={ cat.name} value={cat} 
          style={[{
            backgroundColor : productCategory == cat.id ? MangoStyles.mangoOrangeYellow : 'white',
            color : productCategory == cat.id ? 'white' : 'black',
          }]}
           />
        })
      }

  return (
    <View  style ={styles.container}>
      <View  style={styles.row}>
        <Text style={styles.label}>Product Name:</Text>
        <TextInput
          placeholder='Ex: tea'
          value={productName}
          onChangeText={text => productNameSet(text)}
          style={[styles.textField]}
        />
      </View>
      <View  style={styles.row}>
        <Text style={styles.label}>Product Price:</Text>
        <TextInput keyboardType='number-pad'
          placeholder='ex: 12.00'
          value={productPrice}
          onChangeText={text => productPriceSet(text)}
          style={[styles.textField]}
        />
      </View>
      <View  style={styles.row}>
        <Text style={styles.label}>Product Category:</Text>
      <View style={styles.field}>
        <Picker selectedValue={productCategory} onValueChange={textValue => productCategorySet(textValue)} style={styles.field} >
            <Picker.Item key={null} label={ 'No Category'} value={null} />
                {renderCategoryList()}
        </Picker>
      </View>

      </View>
      <View  style={styles.row}>
        <Text style={styles.label}>Product Description:</Text>
        <TextInput
          placeholder='Ex: mango tea'
          value={productDescription}
          multiline={true}
          numberOfLines={3}
          onChangeText={text => productDescriptionSet(text)}
          style={[styles.textField,{textAlignVertical:'top'}]}
        />
      </View>
      <View  style={styles.row}>

      <TouchableOpacity
            onPress={saveProduct}
            style={styles.btnSave}
            >
            <Text style={styles.buttonText}>Save Item</Text>
          </TouchableOpacity>
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
    },
    searchBtn: {
        marginHorizontal: 10,
        padding: 5
      },
      btnSave: {
          marginTop:20,
        backgroundColor: MangoStyles.mangoOrangeYellow,
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
      },
      buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
      },
})