import React from 'react';
import {Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import DetailScreen from '../screens/DetailScreen';
import type {RootStackParamList} from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#2a9d8f',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#e0e0e0',
        },
        headerStyle: {backgroundColor: '#2a9d8f'},
        headerTintColor: '#fff',
        headerTitleStyle: {fontWeight: '700'},
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Productos',
          tabBarIcon: ({color, size}) => (
            <Text style={{fontSize: size, color}}>{'🏠'}</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          title: 'Favoritos',
          tabBarIcon: ({color, size}) => (
            <Text style={{fontSize: size, color}}>{'⭐'}</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {backgroundColor: '#2a9d8f'},
          headerTintColor: '#fff',
          headerTitleStyle: {fontWeight: '700'},
        }}>
        <Stack.Screen
          name="HomeTabs"
          component={HomeTabs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{title: 'Detalle'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
