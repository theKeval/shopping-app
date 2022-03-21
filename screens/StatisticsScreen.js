import { StyleSheet, Text, View } from 'react-native'
import React , {useState} from 'react'
import MangoStyles from '../styles';
import { Picker } from '@react-native-picker/picker';


import { getCategoriesSold,getProductsSold } from '../FirebaseConfig/FirebaseOperations';


const StatisticsScreen = ({navigation, route}) => {

  const [statisticsCat, statisticsCatSet] = useState(null);
  const [statisticsProd, statisticsProdSet] = useState(null);
  const [seledtedLabels, seledtedLabelsSet] = useState([]);
  const [selectedValues, selectedValuesSet] = useState([]);
  const [filterType, filterTypeSet] = useState('categories');
  const [filterSpan, filterSpanSet] = useState('all');
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {

        try {
          getCategoriesSold().then((response)=>{
            statisticsCatSet(response);
            setChartData(filterType,filterSpan)
          })
          getProductsSold().then((response)=>{
            statisticsProdSet(response);
            
          })
        } catch (error) {
            console.log(error)    
        }
        
    });

    return unsubscribe;
  }, [navigation]);

  const setChartData = (type,span) => {
    let labels = [], data = [];
    if(type === 'categories'){
      labels = statisticsCat.map(cat => cat.name)
      data = statisticsCat;
      
    }else{
      labels = statisticsProd.map(prod => prod.name)
      data = statisticsProd;
    }

    if(span=='lastMonth'){
      data = data.map(cat => cat.totalMonth)
    }else if('lastWeek'){
      data = data.map(cat => cat.totalWeek)
    }else{
      data = data.map(cat => cat.total)
    }
    
    selectedValuesSet(data)
    seledtedLabelsSet(labels)
  }
  return (
    <View  style={styles.container}>
      <View  style={styles.row}>
          <Text style={styles.label}>Time Span:</Text>
          <View style={styles.field}>
            <Picker selectedValue={filterSpan} onValueChange={(value)=>{filterSpanSet(value);setChartData(filterType,value)}} >
                <Picker.Item key={'all'} label={ 'All time'} value={'all'} />
                <Picker.Item key={'lastWeek'} label={ 'Last Week'} value={'lastWeek'} />
                <Picker.Item key={'lastMonth'} label={ 'Last Month'} value={'lastMonth'} />
            </Picker>
          </View>      
      </View>
      <View  style={[styles.row, {marginBottom:20}]}>
          <Text style={styles.label}>Data type:</Text>
          <View style={styles.field}>
            <Picker selectedValue={filterType} onValueChange={(value)=>{filterTypeSet(value);setChartData(value,filterSpan)}} >
                <Picker.Item key={'categories'} label={ 'Categories'} value={'categories'} />
                <Picker.Item key={'products'} label={ 'Products'} value={'products'} />
            </Picker>
          </View>      
      </View>

    </View>
  )
}

export default StatisticsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MangoStyles.mangoPaleOrange,
    paddingHorizontal: 10,
    paddingTop:10
  },

  field:{
    backgroundColor: 'white',
    borderColor: MangoStyles.mangoOrangeYellow,
    borderWidth: 2,
    borderRadius: 5,
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
})