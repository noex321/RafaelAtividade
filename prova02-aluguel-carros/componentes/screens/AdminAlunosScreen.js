import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import globalStyles from '../styles/globalStyles'; // Usando os estilos que já criamos

// O nome do componente pode ser HomeScreen ou AdminHomeScreen, dependendo da sua estrutura
export default function AdminHomeScreen({ navigation }) {
  return (
    // Usamos o 'container' do nosso globalStyles para aplicar o fundo branco/azul claro
    <View style={globalStyles.container}>
      
      {/* Usamos o 'title' do nosso globalStyles para o título principal */}
      <Text style={globalStyles.title}>Painel do Admin</Text>

      {/* Botão para navegar para a tela de Gerenciamento de Cursos */}
      <TouchableOpacity
        style={globalStyles.button}
        onPress={() => navigation.navigate('CursosFaculdade')} // Navega para a rota do Gerenciador de Cursos
      >
        <Text style={globalStyles.buttonText}>Gerenciar Cursos</Text>
      </TouchableOpacity>

      {/* Botão para navegar para a tela de Gerenciamento de Alunos */}
      <TouchableOpacity
        style={[globalStyles.button, styles.buttonSpacing]} // Adiciona um espaçamento
        onPress={() => navigation.navigate('CadastroAlunos')} // Navega para a rota do Gerenciador de Alunos
      >
        <Text style={globalStyles.buttonText}>Gerenciar Alunos</Text>
      </TouchableOpacity>

      {/* Botão para navegar para a tela de Gerenciamento de Temas */}
      <TouchableOpacity
        style={[globalStyles.button, styles.buttonSpacing]} // Adiciona um espaçamento
        onPress={() => navigation.navigate('CadastroTemas')} // Navega para a rota do Gerenciador de Temas
      >
        <Text style={globalStyles.buttonText}>Gerenciar Temas</Text>
      </TouchableOpacity>

    </View>
  );
}

// Estilo local apenas para adicionar espaçamento entre os botões
const styles = StyleSheet.create({
    buttonSpacing: {
        marginTop: 15,
    }
});