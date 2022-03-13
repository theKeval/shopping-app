import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ItemDetailsScreen = (navigation , route) => {
  return (
    <View>
      <Text>ItemDetailsScreen {route.params}</Text>
    </View>
  )
}

export default ItemDetailsScreen

const styles = StyleSheet.create({})