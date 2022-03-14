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

const headerStyleMango = {
  headerTitleAlign: 'center',
  headerStyle: {
    backgroundColor: MangoStyles.mangoOrangeYellow
  },
  headerTitleStyle: {
    color: 'white'
  }
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Stack = createStackNavigator();

function ModalScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 30 }}>This is a modal!</Text>
      <Button onPress={() => navigation.goBack()} title="Dismiss" />
    </View>
  );
}

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
        <Stack.Screen name="MyModal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
function OrdersStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="OrdersScreen" component={OrdersScreen} />
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

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={MangoStyles.mangoOrangeYellow} />;
      },
      tabBarActiveTintColor: MangoStyles.mangoOrangeYellow,
      tabBarInactiveTintColor: 'black',
      headerShown: false,

    })}
  >
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Orders" component={OrdersStackScreen} />
      <Tab.Screen name="Search" component={SettingsScreen} />
      <Tab.Screen name="Account" component={AccountStackScreen} />
    </Tab.Navigator>

  );
}
