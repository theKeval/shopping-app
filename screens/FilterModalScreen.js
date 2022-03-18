import { StyleSheet, Text, View ,TouchableOpacity, TextInput,ScrollView } from 'react-native'
import React, {useState} from 'react'
import { InputField } from '../components';
import { Ionicons,FontAwesome5,AntDesign,Entypo,Fontisto,MaterialIcons} from '@expo/vector-icons';
import MangoStyles from '../styles'
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

const FilterModalScreen = ({navigation, route}) => {
  let multiSelect;
    const [selectedCategory , selectedCategorySet] = useState([]);
    const [searchText , searchTextSet] = useState("");
    const [maxPrice , maxPriceSet] = useState("");
    const [minPrice , minPriceSet] = useState("");

    if(route.params && route.params.filter ){
      selectedCategorySet(route.params.filter['selectedCategory']);
      searchTextSet(route.params.filter['searchText']);
      maxPriceSet(route.params.filter['maxPrice']);
      minPriceSet(route.params.filter['minPrice']);
    }
    React.useLayoutEffect(() => {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity onPress={() => {
              console.log('submit',minPrice)
              if(minPrice !== "" && maxPrice !== "" && parseFloat(minPrice) > parseFloat(maxPrice)){
                alert('Min. Price is greater than the Max. Price')
              }else if(selectedCategory.length === 0){
                alert('Please select at least 1 category')
              }else{
                  navigation.navigate('HomeScreen', { 
                    filters: { selectedCategory,searchText,maxPrice,minPrice}
                  })
              }
            }
          }>
            <Text style={styles.searchBtn}>
              <Ionicons name='checkmark' size={24} color='white' />
            </Text>
          </TouchableOpacity>
        ),

      });
    }, [navigation]);
  const toggleCategory = (item)=>{
    let selectedCategoryVar = [...selectedCategory]
    if(selectedCategoryVar.includes(item)){
      selectedCategoryVar.splice(selectedCategoryVar.indexOf(item),1)
    }else{
      selectedCategoryVar.push(item)
    }
    selectedCategorySet(selectedCategoryVar)
  }
  const renderCategories = ()=>{
    return items.map((item, index) => {
      return (
        <TouchableOpacity style={styles.category} key={item.id} onPress={() => toggleCategory(item)}>
          <Text >{item.name}</Text>
        </TouchableOpacity>
      );
    })
  }
  return (
    <View style={styles.container}>
      <View  style={styles.row}>
        <Text style={styles.label}>Search text:</Text>

        <TextInput
          placeholder='Search...'
          value={searchText}
          onChangeText={text => searchTextSet(text)}
          style={[styles.searchTextBar]}
        />
      </View>
      <View  style={styles.row}>
          <Text style={styles.label}>Category</Text>

      </View>
          <ScrollView style={[styles.scrollView]}>
            {renderCategories()}
          </ScrollView>
          <Text >{JSON.stringify(selectedCategory)}</Text>
      <View  style={styles.row}>
        <Text style={styles.label}>Max Price($):</Text>

        <TextInput keyboardType="numeric"
         placeholder='Ex: $15.00'
          value={maxPrice}
          onChangeText={text => maxPriceSet((text))}
          style={[styles.searchTextBar]}
        />
      </View>
      <View  style={styles.row}>
        <Text style={styles.label}>Min Price($):</Text>

        <TextInput keyboardType="numeric"
         placeholder='Ex: $0.00'
          value={minPrice}
          onChangeText={text => minPriceSet((text))}
          style={[styles.searchTextBar]}
        />
      </View>
    </View>
  )
}

const items = [{
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

export default FilterModalScreen

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: MangoStyles.mangoPaleOrange,
    paddingHorizontal: '5%'
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
  searchBtn: {
    marginRight: 10,
    padding: 5
  },
  searchTextBar:{
    // padding: 12,
    backgroundColor: 'white',
    borderColor: MangoStyles.mangoOrangeYellow,
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  scrollView:{
    maxHeight: 150,
    alignContent: 'flex-start',
    flexDirection: 'row',
    backgroundColor: MangoStyles.mangoGray,
  },
  category:{
    // width: '50%',
    backgroundColor: MangoStyles.mangoGreen,
    flexDirection: 'column',
    margin: 5,
    padding: 5
  }
})