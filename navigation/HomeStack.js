import React , {useContext} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
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
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import CategoriesScreen from '../screens/CategoriesScreen';

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
const TabNavigator = () => {
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
            } else if (route.name === 'CategoriesScreen') {
              iconName = focused ? 'grid' : 'grid-outline';
            }else if (route.name === 'AccountScreen' ||  route.name === 'LoginScreen') {
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
          <Tab.Screen name="CategoriesScreen" component={CategoriesScreen}  options={{ title : 'Categories'}}/>

          <Tab.Screen name="HomeScreen" component={HomeScreen}  options={{ title : 'Products'}}/>
          { user ? <Tab.Screen name="OrdersScreen" component={OrdersScreen}  options={{title : 'Orders'}} /> : <></>}
          { user ?
          <Tab.Screen name="AccountScreen" component={AccountScreen} options={{title : 'Account'}} />
          : <Tab.Screen name='LoginScreen' component={LoginScreen} options={{title : 'Login' ,headerShown: false}}/>}
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

      {/* TABS GROUP */}
      <Stack.Group >
        <Stack.Screen  name="Home" component={TabNavigator} options={{
          headerShown: false,
        }}/>
      </Stack.Group>


      {/* ITEMS GROUP */}
      <Stack.Group >
        {/* ITEMS DETAIL AND EDIT SUBGROUP */}
        <Stack.Group >
          <Stack.Screen name="ItemDetailsScreen" component={ItemDetailsScreen} options={{}}/>
          <Stack.Screen name="EditProductScreen" component={EditProductScreen} options={{...headerStyleMango, headerTintColor: 'white' }} />
        </Stack.Group>
         {/* ITEMS SEARCH MODAL FILTER SUBGROUP */}
        <Stack.Group  screenOptions={{...headerStyleMango, presentation: 'modal', title : 'Search' }}>
          <Stack.Screen name="FilterModalScreen" component={FilterModalScreen} />
        </Stack.Group>
      </Stack.Group>

      {/* ORDERS GROUP */}
      <Stack.Group screenOptions={{...headerStyleMango,headerTintColor: 'white'}} >
        <Stack.Screen name="OrderDetailsScreen" component={OrderDetailsScreen} options={{}}/>
      </Stack.Group>

      {/* AUTH GROUP */}
      <Stack.Group screenOptions={{headerShown: false}}>
        <Stack.Screen name='Signup' component={SignupScreen} />
      </Stack.Group>

    </Stack.Navigator>
  );

}
