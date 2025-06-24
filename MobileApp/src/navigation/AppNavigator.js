import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AdminAuctionRoomScreen from '../screens/AdminAuctionRoomScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeClientScreen from '../screens/HomeClientScreen';
import AuctionRoomScreen from '../screens/AuctionRoomScreen';
import AuctionDetailsScreen from '../screens/AuctionDetailsScreen';
import AuctionListScreen from '../screens/AuctionListScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTintColor: '#FFD700',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerShown: true,
        }}
      >
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{
            title: 'Entrar',
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name="Register" 
          component={RegisterScreen}
          options={{
            title: 'Cadastrar',
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name="Home" 
          component={HomeClientScreen}
          options={{
            title: 'Início',
            headerLeft: null,
          }}
        />
        <Stack.Screen 
          name="AdminAuction" 
          component={AdminAuctionRoomScreen}
          options={{
            title: 'Gerenciar Leilões',
          }}
        />
        <Stack.Screen 
          name="AuctionList" 
          component={AuctionListScreen}
          options={{
            title: 'Leilões Disponíveis',
          }}
        />
        <Stack.Screen 
          name="AuctionRoom" 
          component={AuctionRoomScreen}
          options={({ route }) => ({
            title: route.params?.auction?.name || 'Sala de Leilão',
          })}
        />
        <Stack.Screen 
          name="AuctionDetails" 
          component={AuctionDetailsScreen}
          options={{
            title: 'Detalhes do Leilão',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}