import React , {useContext,useState} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import MangoStyles from '../styles'
import { AuthenticatedUserContext } from './AuthenticatedUserProvider';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons,FontAwesome5,AntDesign,Entypo,Fontisto,MaterialIcons} from '@expo/vector-icons';
import ItemDetailsScreen from '../screens/ItemDetailsScreen';
import OrdersScreen from '../screens/OrdersScreen';
import AccountScreen from '../screens/AccountScreen';
import ChangeInfoScreen from '../screens/ChangeInfoScreen';
import OrderDetailsScreen from '../screens/OrderDetailsScreen';
import EditProductScreen from '../screens/EditProductScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import ShoppingCartScreen from '../screens/ShoppingCartScreen';
import { GetUserInfo,getAsyncUser,removeAsyncUser } from '../FirebaseConfig/FirebaseOperations';
import UsersListScreen from '../screens/UsersListScreen';
import UserInfoScreen from '../screens/UserInfoScreen';
import StatisticsScreen from '../screens/StatisticsScreen';

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

const HomeProdStack = () => {
  return (
    <Stack.Navigator  screenOptions={{...headerStyleMango,headerTintColor: 'white',}} >
          <Stack.Screen name="CategoriesScreen" component={CategoriesScreen} options={{ title : 'Categories'}} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} options={{...headerStyleMango, headerTintColor: 'white',title : 'Products' }} />
        </Stack.Navigator>
  )
}
const TabNavigator = ({navigation}) => {
  const { user, setUser , userId} = useContext(AuthenticatedUserContext) ;
  const [isAdmin, isAdminSet] = useState(false);
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('stacje', userId)

        // getAsyncUser().then(response => {
        //   isAdminSet(response && response.isAdmin)
          
        // }).catch(()=> {
        //   isAdminSet(false)
        // })
    });
      // Return the function to unsubscribe from the event so it gets removed on unmount
      return unsubscribe;
    }, [navigation]);

  return (    
      <Tab.Navigator 
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconColor;
            let iconName;
            if (route.name === 'HomeProdStack') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'ShoppingCartScreen') {
              iconName = focused ? 'cart' : 'cart-outline';
            } else if (route.name === 'OrdersScreen') {
              iconName = focused ? 'list' : 'list-outline';
            }else if (route.name === 'CategoriesScreen') {
              iconName = focused ? 'grid' : 'grid-outline';
            }else if (route.name === 'StatisticsScreen') {
              iconName = focused ? 'bar-chart' : 'bar-chart-outline';
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

          <Tab.Screen name="HomeProdStack" component={HomeProdStack}  options={{headerShown: false, title:'Products'}}/>
          { user ?<Tab.Screen name="ShoppingCartScreen" component={ShoppingCartScreen}  options={{title : 'My shopping Cart'}} /> : <></>}
          { user ? <Tab.Screen name="OrdersScreen" component={OrdersScreen}  options={{title : 'Orders'}} /> : <></>}
          { user ? <Tab.Screen name="StatisticsScreen" component={StatisticsScreen}  options={{title : 'Statistics'}} /> : <></>}
          
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
      </Stack.Group>

      {/* ORDERS GROUP */}
      <Stack.Group screenOptions={{...headerStyleMango,headerTintColor: 'white'}} >
        <Stack.Screen name="OrderDetailsScreen" component={OrderDetailsScreen} options={{}}/>
      </Stack.Group>

      {/* AUTH GROUP */}
      <Stack.Group screenOptions={{headerShown: false}}>
        <Stack.Screen name='Signup' component={SignupScreen} />
      </Stack.Group>

      {/* INFO GROUP*/}
      <Stack.Group screenOptions={{...headerStyleMango,headerTintColor: 'white'}}>
        <Stack.Screen name='Account Information' component={ChangeInfoScreen} />
      </Stack.Group>
      {/* USERS GROUP*/}
      <Stack.Group screenOptions={{...headerStyleMango,headerTintColor: 'white'}}>
        <Stack.Screen name='UsersListScreen' component={UsersListScreen}  options={{title : 'Users'}}/>
        <Stack.Screen name='UserInfoScreen' component={UserInfoScreen}  options={{title : 'User Info'}}/>
      </Stack.Group>
    </Stack.Navigator>
  );

}
