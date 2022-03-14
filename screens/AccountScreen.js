import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Firebase from '../FirebaseConfig/Config'
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';

const auth = Firebase.auth();

const AccountScreen =  ({ navigation, route })  => {
  React.useLayoutEffect(() => {
      navigation.setOptions({tabBarStyle: {display: 'none'}, title : route.params.order.title});
    })
return (
  <View style={styles.container}>
    <View>
      <Text style={styles.label}>User</Text>
      
    </View>
    <View>
      <Text style={styles.label}>Email</Text>
    </View>
    <View>
      <Text style={styles.label}>Total</Text>
    </View>

  </View>
)
}

export default AccountScreen

const styles = StyleSheet.create({
  label: {
    flex: 1,
    fontSize: 24,
  }
})