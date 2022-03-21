import { StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import { getUserOrders,getAsyncUser,removeAsyncUser } from '../FirebaseConfig/FirebaseOperations';

const UserInfoScreen = ({navigation, route}) => {
    const [userInfo, userInfoSet] = useState(null);
    const [userOrders, userOrdersSet] = useState([]);

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            if(route.params && route.params.user ){
                userInfoSet(route.params.user )
                getUserOrders(route.params.user.id,'all').then(userOrdersResponse => {
                    userOrdersSet(userOrdersResponse)
                })
            }

        })
        return unsubscribe;
    }, [navigation]);
  return (
    <View>
      <Text>UserInfoScreen</Text>
    </View>
  )
}

export default UserInfoScreen

const styles = StyleSheet.create({})