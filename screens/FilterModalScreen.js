import { StyleSheet, Text, View ,TouchableOpacity, TextInput,ScrollView } from 'react-native'
import React, {useState} from 'react'
import { InputField } from '../components';
import { Ionicons,FontAwesome5,AntDesign,Entypo,Fontisto,MaterialIcons} from '@expo/vector-icons';
import MangoStyles from '../styles'
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

const FilterModalScreen = ({navigation}) => {
  let multiSelect;
    const [selectedItems , selectedItemsSet] = useState([]);
    const [searchText , searchTextSet] = useState("");
    const [maxPrice , maxPriceSet] = useState(100);
    const [minPrice , minPriceSet] = useState(0);
    React.useLayoutEffect(() => {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate('HomeStack', {
            selectedItems,
            searchText,
            maxPrice,
            minPrice,
          })}>
            <Text style={styles.searchBtn}>
              <Ionicons name='checkmark' size={24} color='white' />;
            </Text>
          </TouchableOpacity>
        ),
      });
    }, [navigation]);
  const toggleCategory = (item)=>{
    let selectedItemsVar = [...selectedItems]
    if(selectedItemsVar.includes(item)){
      selectedItemsVar.splice(selectedItemsVar.indexOf(item),1)
    }else{
      selectedItemsVar.push(item)
    }
    selectedItemsSet(selectedItemsVar)
  }
  const renderCategories = ()=>{
    return items.map((item, index) => {
      return (
        <TouchableOpacity style={styles.category} onPress={() => toggleCategory(item)}>
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
          <ScrollView style={[styles.scrollView]}>
            {renderCategories()}
          </ScrollView>
          <Text >{JSON.stringify(selectedItems)}</Text>

      </View>
      <View  style={styles.row}>
        <Text style={styles.label}>Max Price:</Text>

        <TextInput
          value={maxPrice}
          onChangeText={text => maxPriceSet(parseFloat(text))}
          style={[styles.searchTextBar]}
        />
      </View>
      <View  style={styles.row}>
        <Text style={styles.label}>Min Price:</Text>

        <TextInput
          value={minPrice}
          onChangeText={text => minPriceSet(parseFloat(text))}
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
    flexWrap:'wrap'
  },
  category:{
    backgroundColor: 'gray',
    margin: 5,
    padding: 5
  }
})