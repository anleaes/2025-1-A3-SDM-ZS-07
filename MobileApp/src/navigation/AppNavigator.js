import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AdminAuctionRoomScreen from '../screens/AdminAuctionRoomScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeClientScreen from '../screens/HomeClientScreen';
import AuctionRoomScreen from '../screens/AuctionRoomScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false, // ou true se quiser cabeçalho
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="AdminAuction" component={AdminAuctionRoomScreen} />
        <Stack.Screen name="Home" component={HomeClientScreen} />
        <Stack.Screen name="Auction" component={AuctionRoomScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
