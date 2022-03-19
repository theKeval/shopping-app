import { StyleSheet, Text, View,FlatList,TouchableOpacity,Alert  } from 'react-native'
import React, { useEffect,useState }  from 'react'
import { createCategory,updateCategory,getAllCategories,getCategory,removeCategory } from '../FirebaseConfig/FirebaseOperations';
import { Ionicons} from '@expo/vector-icons';
import MangoStyles from '../styles'
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

// import Prompt from 'react-native-prompt';
const CategoriesScreen = ({navigation}) => {
    const [categories, categoriesSet] = useState([]);
    const [userAdmin,userAdminSet] = useState(true)
    const [promptVisible,promptVisibleSet] = useState(false)
    const [selectedCategory,selectedCategorySet] = useState(null)
    const selectCategory = (item) =>{
        selectedCategorySet(item)
        console.log('selectCategory')
    }
    const editCategory = (item) =>{
        selectedCategorySet(item)
        console.log('editCategory')
    }
    const deleteCategory = (item) =>{
        selectedCategorySet(item)
        showAlert();
        console.log('deleteCategory',item)
    }
    const showAlert = () =>
{  Alert.alert(
    "Delete Category?",
    "Do you want to delete '" + selectedCategory.name +"' category?",
    [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => {removeCategory(selectedCategory.id)},
        style: "cancel",
      },
    ],
    {
      cancelable: true,
    }
  )};
    useEffect(() => {
        getAllCategories().then(categoriesFound => {
          categoriesSet(categoriesFound) 
        }).catch()
        return () =>   {
        }
      }, [])
      React.useLayoutEffect(() => {

        navigation.setOptions({
        //   headerRight: () => ( 
        //     <TouchableOpacity onPress={() => navigation.navigate('FilterModalScreen', filters)}>
        //       <Text style={styles.searchBtn}>
        //         <Ionicons name='search' size={20} color='white' />
        //       </Text>
        //     </TouchableOpacity> 
        //   ),
          headerLeft: () => ( userAdmin   ?
            <TouchableOpacity onPress={() => {
                promptVisibleSet(true)
              }
            }>
              <Text style={styles.searchBtn}>
                <Ionicons name='add' size={24} color='white' />;
              </Text>
            </TouchableOpacity> : <View />
          ),
        });
      }, [navigation]);

    return (
      
        <View style ={styles.container}>
            {/* <Prompt
            title='Add Category'
            placeholder='Type the name of the new category'
            defaultValue={selectedCategory ? selectedCategory.name : ''}
            visible={ promptVisible }
            onCancel={ () => {}}
            onSubmit={ (value) => {
                console.log(value)
                promptVisibleSet(false);
            }}/> */}
          <FlatList
            data={categories}
            renderItem={({cat,item,index}) => {
                console.log(item)
                return (
                <View style={[styles.item,{backgroundColor: index%2 ===0 ? 'lightgray': MangoStyles.mangoPaleOrange}]} >
                    <TouchableOpacity onPress={() => {selectCategory(item)}} style={[styles.titleCont , { width : userAdmin === true? '60%' : '100%'}]}>
                        <Text style={[styles.title]}>{item.name}</Text>      
                    </TouchableOpacity>
                    

                    { userAdmin === true ? (<TouchableOpacity onPress={() => {editCategory(item)}} style={[styles.editBtn]}>
                         <Text style={[styles.title]}>
                            <Ionicons name='pencil' size={24} color='white' />
                        </Text>
                    </TouchableOpacity>) : null}
                    { userAdmin === true  && item.name !== 'Default' ? (<TouchableOpacity onPress={() => {deleteCategory(item)}} style={[styles.deleteBtn]}>
                        <Text style={[styles.title]}>
                            <Ionicons name='trash' size={24} color='white' />
                        </Text>
                    </TouchableOpacity>) : null }
                    
                </View>

            )
            }}
            keyExtractor={item => item.id}
          />
        </View>
        
    )
}

export default CategoriesScreen

const styles = StyleSheet.create({
    container: {
        fontSize: 18,
        flex: 1,
        backgroundColor: MangoStyles.mangoPaleOrange,
        paddingHorizontal: 0,
        paddingTop:10,
  
      },
      title:{
        fontSize: 25
      },
      titleCont:{
        padding:10
      },
      item:{
        flexDirection : 'row',
        paddingHorizontal: 5,
        paddingVertical:10
    },
    searchBtn: {
      marginHorizontal: 10,
      padding: 5
    },
    editBtn:{
        width: '15%',
        backgroundColor: MangoStyles.mangoPositiveAction,
        padding: 15,
        marginHorizontal: 10,
        borderRadius: 5
    },
    deleteBtn:{
        width: '15%',
        backgroundColor: MangoStyles.mangoNegativeAction,
        padding: 15,
        marginHorizontal: 5,
        borderRadius: 5
    },
})