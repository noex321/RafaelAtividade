// AppNavigator.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InicioScreen from './InicioScreen.js';
import ProjetosScreen from './ProjetosScreen.js';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function DrawerNavigator({ setIsAuthenticated }) {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#0D47A1',
        },
        headerTintColor: '#FFFFFF',
        drawerStyle: {
          backgroundColor: '#121212',
        },
        drawerActiveTintColor: '#0D47A1',
        drawerInactiveTintColor: '#FFFFFF',
        drawerLabelStyle: {
          fontSize: 16,
        },
      }}
    >
      <Drawer.Screen name="Inicio">
        {() => <InicioScreen setIsAuthenticated={setIsAuthenticated} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}

// Stack que engloba o Drawer + telas ocultas
export default function AppNavigator({ setIsAuthenticated }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Drawer">
        {() => <DrawerNavigator setIsAuthenticated={setIsAuthenticated} />}
      </Stack.Screen>

      <Stack.Screen
        name="Projetos"
        options={{
          headerShown: true,
          title: 'Projetos',
          headerStyle: { backgroundColor: '#0D47A1' },
          headerTintColor: '#FFFFFF',
        }}
      >
        {() => <ProjetosScreen setIsAuthenticated={setIsAuthenticated} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
