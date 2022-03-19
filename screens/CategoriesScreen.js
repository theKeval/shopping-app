import { StyleSheet, Text, View,FlatList,TouchableOpacity,Alert  } from 'react-native'
import React, { useEffect,useState,useContext }  from 'react'
import { createCategory,updateCategory,getAllCategories,GetUserInfo,removeCategory } from '../FirebaseConfig/FirebaseOperations';
import { Ionicons} from '@expo/vector-icons';
import MangoStyles from '../styles'
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';

import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import Prompt from 'react-native-prompt-crossplatform';
const CategoriesScreen = ({navigation}) => {
    const { user } = useContext(AuthenticatedUserContext);
    const [userInfo, userInfoSet] = useState(null);

    const [categories, categoriesSet] = useState([]);
    const [userAdmin,userAdminSet] = useState(true)
    const [promptVisible,promptVisibleSet] = useState(false)
    const [promptText,promptTextSet] = useState('')
    const [selectedCategory,selectedCategorySet] = useState(null)
    const selectCategory = (item) =>{
        selectedCategorySet(item)
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

  const updateCategoryList = ()=>{
    getAllCategories().then(categoriesFound => {
        categoriesSet(categoriesFound.sort((a,b) => {return a.name < b.name ? -1 : 1 })) 
      }).catch()
  }
    useEffect(() => {
        updateCategoryList();
        if(user && user.email && user.email  != ''){
            GetUserInfo(user.email).then(userResponse =>{
                userInfoSet(userResponse); 
            })
        }
        return () =>   {
        }
      }, [user])
      React.useLayoutEffect(() => {

        navigation.setOptions({
        //   headerRight: () => ( 
        //     <TouchableOpacity onPress={() => navigation.navigate('FilterModalScreen', filters)}>
        //       <Text style={styles.searchBtn}>
        //         <Ionicons name='search' size={20} color='white' />
        //       </Text>
        //     </TouchableOpacity> 
        //   ),
          headerLeft: () => ( userInfo && userInfo.isAdmin   ?
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
      }, [navigation]);

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
                    <TouchableOpacity onPress={() => {selectCategory(item)}} style={[styles.titleCont , { width : userInfo && userInfo.isAdmin? '60%' : '100%'}]}>
                        <Text style={[styles.title]}>{item.name}</Text>      
                    </TouchableOpacity>
                    

                    { userInfo && userInfo.isAdmin ? (<TouchableOpacity onPress={() => {editCategory(item)}} style={[styles.editBtn]}>
                         <Text style={[styles.title]}>
                            <Ionicons name='pencil' size={24} color='white' />
                        </Text>
                    </TouchableOpacity>) : null}
                    { userInfo && userInfo.isAdmin  && item.name !== 'Default' ? (<TouchableOpacity onPress={() => {deleteCategory(item)}} style={[styles.deleteBtn]}>
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