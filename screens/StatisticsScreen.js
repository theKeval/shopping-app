import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React , {useState} from 'react'
import MangoStyles from '../styles';
import { Picker } from '@react-native-picker/picker';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";


import { getSales } from '../FirebaseConfig/FirebaseOperations';

const screenWidth = Dimensions.get('window').width;

const StatisticsScreen = ({navigation, route}) => {

  const [statistics, statisticsSet] = useState([]);
  const [statisticsProd, statisticsProdSet] = useState([]);
  const [isLoading, isLoadingSet] = useState([]);
  const [filterType, filterTypeSet] = useState('categories');
  const [filterSpan, filterSpanSet] = useState('total');
  var colorArray = ['#FF6633', '#FF33FF',  '#00B3E6', 
   '#3366E6', '#999966', '#99FF99', '#B34D4D',
  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF','#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];
  const [chartData, chartDataSet] = useState([])
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {

        try {
          getSales().then(async (response)=>{
             await statisticsSet(response);
             setChartData('categories' , 'total' ,response)
             console.log(response)
          })
        } catch (error) {
            console.log(error)    
        }
        
    });

    return unsubscribe;
  }, [navigation]);

  const setChartData = async (type,span , data) => {
    isLoadingSet(true)
    
    const result = ([ ...(data ? data[type] : statistics[type])]).map((item,index) => {
      return {
        name: item.name,
        sales: parseInt(item[span]),
        color: colorArray[index],
        legendFontColor: colorArray[index],
        legendFontSize: 15
       }
     });
     

     chartDataSet(result)
     isLoadingSet(false)
  }

  return (
    <View  style={styles.container}>
      <View  style={styles.row}>
          <Text style={styles.label}>Time Span:</Text>
          <View style={styles.field}>
            <Picker selectedValue={filterSpan} onValueChange={(value)=>{filterSpanSet(value);setChartData(filterType,value)}} >
                <Picker.Item key={'total'} label={ 'All time'} value={'total'} />
                <Picker.Item key={'totalWeek'} label={ 'Last Week'} value={'totalWeek'} />
                <Picker.Item key={'totalMonth'} label={ 'Last Month'} value={'totalMonth'} />
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
<View style={[{height:'100%',marginTop: 10,flexDirection:'row'}]}>
{!isLoading && chartData && chartData.length> 0 ? 
<PieChart
  data={chartData}
  width={Dimensions.get("window").width -20}
  height={Dimensions.get("window").height *0.3}
  chartConfig={{

    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      
    },

  }}
  accessor={"sales"}
  backgroundColor={"transparent"}
  
/>

: <></>}
      
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