import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import AdminHomeScreen from './AdminHomeScreen';
import CadAlunos from '../screens/CadAlunos';
import CadTemas from '../screens/CadTemas';
import CursosFacul from '../screens/CursosFacul';
import AdminAvaliadorScreen from '../screens/AdminAvaliadorScreen';
import AdminAlunosScreen from '../screens/AdminAlunosScreen'


const Stack = createStackNavigator();

const StackNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="InicioAdmin" component={AdminHomeScreen} />
        <Stack.Screen name="InicioAvaliador" component={AdminAvaliadorScreen} />
        <Stack.Screen name="InicioAlunos" component={AdminAlunosScreen} />
        <Stack.Screen name="CadastroAlunos" component={CadAlunos} />
        <Stack.Screen name="CadastroTemas" component={CadTemas} />
        <Stack.Screen name="CursosFaculdade" component={CursosFacul} />
    </Stack.Navigator>
);

export default StackNavigator;
