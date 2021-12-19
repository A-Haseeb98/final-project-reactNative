import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack'
import Login from './src/screens/login';
import Register from './src/screens/register';
import ManagerLogin from './src/screens/ManagerLogin';
import UserHome from './src/screens/userHome';
import Map from './src/screens/map'
import applyRation from './src/screens/applyRation'
import managerHome from './src/screens/managerHome'
import QrCode from './src/component/barCode';



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown:false}} name="LOGIN" component={Login} />
        <Stack.Screen options={{headerShown:false}} name="REGISTER" component={Register} />
        <Stack.Screen options={{headerShown:false}} name="MANAGER" component={ManagerLogin} />
        <Stack.Screen options={{headerShown:false}} name="USER_HOME" component={UserHome} />
        <Stack.Screen options={{headerShown:false}} name="MAP" component={Map} />
        <Stack.Screen options={{headerShown:false}} name="APPLYRATION" component={applyRation} />
        <Stack.Screen options={{headerShown:false}} name="MANAGER_HOME" component={managerHome} />
        <Stack.Screen options={{headerShown:false}} name="QR_CODE" component={QrCode} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})