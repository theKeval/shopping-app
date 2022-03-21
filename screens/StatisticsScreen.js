import { StyleSheet, Text, View } from 'react-native'
import React , {useState} from 'react'

const StatisticsScreen = () => {
  const [orderDetailObj, orderDetailObjSet] = useState(null);

  return (
    <View>
      <Text>StatisticsScreen</Text>
    </View>
  )
}

export default StatisticsScreen

const styles = StyleSheet.create({})