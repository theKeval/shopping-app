import { StyleSheet, Text, View,FlatList,TouchableOpacity,Alert  } from 'react-native'
import React, { useState,useContext }  from 'react'
import { createCategory,updateCategory,getAllCategories,getAsyncUser,removeCategory } from '../FirebaseConfig/FirebaseOperations';
import { Ionicons} from '@expo/vector-icons';
import MangoStyles from '../styles'
import { NavigationContainer, useFocusEffect } from '@react-navigation/native'
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';

import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import Prompt from 'react-native-prompt-crossplatform';
const CategoriesScreen = ({navigation}) => {
    const { user } = useContext(AuthenticatedUserContext);
    const [userInfo, userInfoSet] = useState(null);

    const [categories, categoriesSet] = useState([]);
    const [isAdmin,isAdminSet] = useState(false)
    const [promptVisible,promptVisibleSet] = useState(false)
    const [promptText,promptTextSet] = useState('')
    const [selectedCategory,selectedCategorySet] = useState(null);
    
    const selectCategory = (item) =>{
        // selectedCategorySet(item)
        navigation.navigate('HomeScreen', {catId:item.id});
        console.log('selectCategory')
    }
    const editCategory = (item) =>{
        selectedCategorySet(item)
        promptTextSet(item.name)
        promptVisibleSet(true)
        console.log('editCategory')
    }
    const deleteCategory = (item) =>{
        selectedCategorySet(item)
        showAlert();
        console.log('deleteCategory',item)
    }
    const showAlert = () =>
      {  Alert.alert( "Delete Category?", "Do you want to delete '" + selectedCategory.name +"' category?",
        [
          {
            text: "Cancel",onPress: () => {},style: "cancel",},
          {
            text: "Delete",
            onPress: () => {removeCategory(selectedCategory.id);updateCategoryList();},
            style: "cancel",
          },
        ],
        {
          cancelable: true,
        }
      )};
      React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          updateCategoryList();
          getUserPermissions();
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
      }, [navigation]);

      const updateCategoryList = () => {
        getAllCategories().then(categoriesFound => {
          categoriesSet(categoriesFound.sort((a, b) => {
            return a.name < b.name ? -1 : 1
          }))
        }).catch()
      }

      const getUserPermissions = async () => {

        try {
          getAsyncUser().then((userResponse)=>{
            console.log('userResponse && userResponse.isAdmin',userResponse && userResponse.isAdmin)
              setHeaderLayout(userResponse && userResponse.isAdmin)
              isAdminSet(userResponse && userResponse.isAdmin)

          })
        } catch (error) {
          console.log(error)
          setHeaderLayout(false)

        }
      }
      const setHeaderLayout = (isAdmin) => {
        navigation.setOptions({
          headerLeft: () => ( user && isAdmin   ?
            <TouchableOpacity onPress={() => {
                selectedCategorySet(null)
                promptVisibleSet(true)
                promptTextSet('')
              }
            }>
              <Text style={styles.searchBtn}>
                <Ionicons name='add' size={24} color='white' />;
              </Text>
            </TouchableOpacity> : <View />
          ),
        });
      }

    return (
      
        <View style ={styles.container}>

            <Prompt
                title=  {selectedCategory && selectedCategory.name ?   "Rename Category" :"Add Category"}
                inputPlaceholder={"Type a name"}
                defaultValue={selectedCategory && selectedCategory.name ?  selectedCategory.name :""}
                isVisible={promptVisible}
                onChangeText={(text) => {
                    promptTextSet(text)
                }}
                onCancel={() => {promptVisibleSet(false)}}
                onSubmit={() => {
                    if(promptText && promptText !== ''){
                        if(selectedCategory && selectedCategory.name){
                            updateCategory(selectedCategory.id,{'name': promptText,'id':selectedCategory.id})
                        }else{
                            console.log({'name': promptText})
                            createCategory({'name': promptText})
                        }
                        promptVisibleSet(false);
                        updateCategoryList();
                    }
                }}
            />
          <FlatList
            data={categories}
            renderItem={({cat,item,index}) => {
                return (
                <View style={[styles.item,{backgroundColor: index%2 ===0 ? 'lightgray': MangoStyles.mangoPaleOrange}]} key={item.id} >
                    <TouchableOpacity onPress={() => {selectCategory(item)}} style={[styles.titleCont , { width : user && isAdmin? '60%' : '100%'}]}>
                        <Text style={[styles.title]}>{item.name}</Text>      
                    </TouchableOpacity>
                    {(user && isAdmin ? 
                        <TouchableOpacity onPress={() => {editCategory(item)}} style={[styles.editBtn]}>
                              <Text style={[styles.title]}>
                                <Ionicons name='pencil' size={24} color='white' />
                            </Text>
                             </TouchableOpacity>   : <View/> ) }
                    {(user && isAdmin ?        <TouchableOpacity onPress={() => {deleteCategory(item)}} style={[styles.deleteBtn]}>
                            <Text style={[styles.title]}>
                                <Ionicons name='trash' size={24} color='white' />
                            </Text>
                        </TouchableOpacity>
                      : <View/> ) }

                    
                    
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