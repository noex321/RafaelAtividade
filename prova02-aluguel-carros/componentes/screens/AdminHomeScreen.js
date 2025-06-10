import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import globalStyles from '../styles/globalStyles';

export default function AdminHomeScreen({ navigation }) {
  return (

    <View style={globalStyles.container}>
      
      <Text style={globalStyles.title}>Painel de Administração</Text>

      <TouchableOpacity
        style={[globalStyles.button, styles.buttonSpacing]}
        onPress={() => navigation.navigate('Cursos Da Faculdade')}
      >
        <Text style={globalStyles.buttonText}>Cursos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[globalStyles.button, styles.buttonSpacing]}
        onPress={() => navigation.navigate('Cadastrar Alunos')}
      >
        <Text style={globalStyles.buttonText}>Alunos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[globalStyles.button, styles.buttonSpacing]}
        onPress={() => navigation.navigate('Cadastrar Temas')}
      >
        <Text style={globalStyles.buttonText}>Temas</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
    buttonSpacing: {
        marginTop: 80,
        height: 80,
    },
});