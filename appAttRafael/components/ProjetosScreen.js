import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const InicioScreen = () => {
  // Dados exemplo
  const projeto = {
    nome: 'Projeto de Engenharia de Software',
    alunos: 'Ana Silva; João Souza; Maria Oliveira',
    dataHora: '30/05/2025 14:30',
    status: 'Efetuar Anotação',
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Parte superior */}
        <Text style={styles.nomeProjeto}>{projeto.nome}</Text>

        {/* Parte do meio */}
        <Text style={styles.alunos}>{projeto.alunos}</Text>

        {/* Parte inferior */}
        <View style={styles.footer}>
          <Text style={styles.status}>{projeto.status}</Text>
          <Text style={styles.dataHora}>{projeto.dataHora}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',  // fundo escuro para combinar com o estilo
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#0D47A1', // azul escuro
    borderRadius: 15,
    padding: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,  // sombra para Android
  },
  nomeProjeto: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 15,
    textAlign: 'center',
  },
  alunos: {
    fontSize: 16,
    color: '#E0E0E0',
    marginBottom: 20,
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  status: {
    fontSize: 14,
    color: '#FFCC00', // amarelo para chamar atenção
    fontWeight: '600',
  },
  dataHora: {
    fontSize: 14,
    color: '#FFFFFF',
  },
});

export default InicioScreen;
