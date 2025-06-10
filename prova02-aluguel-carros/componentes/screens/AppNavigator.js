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
        <Stack.Screen name="Painel" component={AdminHomeScreen} />
        <Stack.Screen name="Painel Avaliador" component={AdminAvaliadorScreen} />
        <Stack.Screen name="Painel Aluno" component={AdminAlunosScreen} />
        <Stack.Screen name="Cadastrar Alunos" component={CadAlunos} />
        <Stack.Screen name="Cadastrar Temas" component={CadTemas} />
        <Stack.Screen name="Cursos Da Faculdade" component={CursosFacul} />
    </Stack.Navigator>
);

export default StackNavigator;
