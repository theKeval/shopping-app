import React , {useContext} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, Button, KeyboardAvoidingView, TextInput, TouchableOpacity, View, Image, Pressable } from 'react-native'
import HomeScreen from '../screens/HomeScreen';
import MangoStyles from '../styles'
import { AuthenticatedUserContext } from './AuthenticatedUserProvider';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons,FontAwesome5,AntDesign,Entypo,Fontisto,MaterialIcons} from '@expo/vector-icons';
import ItemDetailsScreen from '../screens/ItemDetailsScreen';
import OrdersScreen from '../screens/OrdersScreen';
import AccountScreen from '../screens/AccountScreen';
import OrderDetailsScreen from '../screens/OrderDetailsScreen';
import FilterModalScreen from '../screens/FilterModalScreen';
import EditProductScreen from '../screens/EditProductScreen';

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
const TabsScreen = () => {
  const { user } = useContext(AuthenticatedUserContext) ;


  

  return (    
      <Tab.Navigator 
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconColor;
            let iconName;
            if (route.name === 'HomeScreen') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'OrdersScreen') {
              iconName = focused ? 'cart' : 'cart-outline';
            } else if (route.name === 'Search') {
              iconName = focused ? 'search' : 'search-outline';
            }else if (route.name === 'AccountScreen') {
              iconName = focused ? 'person' : 'person-outline';
            }
            // console.log(route.name)
            iconColor = focused ? MangoStyles.mangoOrangeYellow : 'black';
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={iconColor} />;
          },
          tabBarActiveTintColor: 'gray',
          tabBarInactiveTintColor: 'black',
          ...headerStyleMango,
          headerTintColor: 'white',

          
        })}>

          <Tab.Screen name="HomeScreen" component={HomeScreen}  options={{ title : 'Products'}}/>
          {/* { user ? <Tab.Screen name="OrdersScreen" component={OrdersScreen}  options={{title : 'Orders'}} /> : <></>} */}
          <Tab.Screen name="OrdersScreen" component={OrdersScreen}  options={{title : 'Orders'}} />
          <Tab.Screen name="AccountScreen" component={AccountScreen} options={{title : 'Account'}} />
        </Tab.Navigator>
  )
}

const Tab = createBottomTabNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{
      ...headerStyleMango,
      headerTintColor: 'white'
    }}  >
      <Stack.Group >
        <Stack.Screen  name="Home" component={TabsScreen} options={{
          headerShown: false,
        }}/>
      </Stack.Group>
      <Stack.Group >
        <Stack.Group >
          <Stack.Screen name="ItemDetailsScreen" component={ItemDetailsScreen} options={{}}/>
          <Stack.Screen name="EditProductScreen" component={EditProductScreen} options={{...headerStyleMango,
            headerTintColor: 'white'
          }} />
        </Stack.Group>
        <Stack.Group  screenOptions={{...headerStyleMango, presentation: 'modal', 
          title : 'Search' }}>
          <Stack.Screen name="FilterModalScreen" component={FilterModalScreen} />
        </Stack.Group>
      </Stack.Group>
      <Stack.Group screenOptions={{...headerStyleMango,headerTintColor: 'white'}} >
        <Stack.Screen name="OrderDetailsScreen" component={OrderDetailsScreen} options={{}}/>
      </Stack.Group>
    </Stack.Navigator>
  );



  // function HomeTabs() {
  //   return (
  //     <Tab.Navigator>
  //       <Tab.Screen name="Home" component={Home} />
  //       <Tab.Screen name="Feed" component={Feed} />
  //       <Tab.Screen name="Notifications" component={Notifications} />
  //     </Tab.Navigator>
  //   );
  // }
  
  // function App() {
  //   return (
  //     <Stack.Navigator>
  //       <Stack.Screen name="Home" component={HomeTabs} />
  //       <Stack.Screen name="Profile" component={Profile} />
  //       <Stack.Screen name="Settings" component={Settings} />
  //     </Stack.Navigator>
  //   );
  // }

}
