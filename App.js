import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from './screens/Register';
const Stack = createNativeStackNavigator();

import Login from './screens/Login'
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" options={{headerShown: false}} component={Login} />
      </Stack.Navigator>
    </NavigationContainer>  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
