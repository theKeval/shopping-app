import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, Button, KeyboardAvoidingView, TextInput, TouchableOpacity, View, Image, Pressable } from 'react-native'
import HomeScreen from '../screens/HomeScreen';
import MangoStyles from '../styles'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons,FontAwesome5,AntDesign,Entypo,Fontisto,MaterialIcons} from '@expo/vector-icons';
import ItemDetailsScreen from '../screens/ItemDetailsScreen';
import OrdersScreen from '../screens/OrdersScreen';
import AccountScreen from '../screens/AccountScreen';
import OrderDetailsScreen from '../screens/OrderDetailsScreen';
import FilterModalScreen from '../screens/FilterModalScreen';

const headerStyleMango = {
  headerTitleAlign: 'center',
  headerStyle: {
    backgroundColor: MangoStyles.mangoOrangeYellow
  },
  headerTitleStyle: {
    color: 'white'
  }
}


const Stack = createStackNavigator();

function HomeStackScreen() {
  return (
    <Stack.Navigator >
      <Stack.Group>

      <Stack.Screen name="HomeScreen" component={HomeScreen}  options={{
        ...headerStyleMango,
        title : 'Products'
      }}/>
      <Stack.Screen name="ItemDetailsScreen" component={ItemDetailsScreen} options={{
        ...headerStyleMango,
        headerTintColor: 'white'
      }}/>
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen name="MyModal" component={FilterModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
function OrdersStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="OrdersScreen" component={OrdersScreen}  options={{
        ...headerStyleMango,
        title : 'Orders'
      }} />
      <Stack.Screen name="OrderDetailsScreen" component={OrderDetailsScreen} options={{
        ...headerStyleMango,
        headerTintColor: 'white'
      }}/>
    </Stack.Navigator>
  );
}
function AccountStackScreen() {
  return (
    <Stack.Navigator >
      <Stack.Screen name="AccountScreen" component={AccountScreen} options={{
        ...headerStyleMango,
        title : 'Account'
      }}/>
    </Stack.Navigator>
  );
}
const Tab = createBottomTabNavigator();

export default function HomeStack() {
  return (
    <Tab.Navigator 
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconColor;
        let iconName;
        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Orders') {
          iconName = focused ? 'cart' : 'cart-outline';
        } else if (route.name === 'Search') {
          iconName = focused ? 'search' : 'search-outline';
        }else if (route.name === 'Account') {
          iconName = focused ? 'person' : 'person-outline';
        }
        console.log(route.name)
        iconColor = focused ? MangoStyles.mangoOrangeYellow : 'black';
        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={iconColor} />;
      },
      tabBarActiveTintColor: 'gray',
      tabBarInactiveTintColor: 'black',
      headerShown: false,
      tabBarHidden : true
      
    })}
  >
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Orders" component={OrdersStackScreen} />
      <Tab.Screen name="Account" component={AccountStackScreen} />
    </Tab.Navigator>

  );
}
