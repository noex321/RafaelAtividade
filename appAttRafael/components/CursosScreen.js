import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';

const CursosScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [nomeCurso, setNomeCurso] = useState('');
  const [periodoMax, setPeriodoMax] = useState('');
  const [cursos, setCursos] = useState([]); // Lista de cursos cadastrados

  const handleSalvarCurso = () => {
    if (nomeCurso && periodoMax) {
      const novoCurso = {
        id: Date.now().toString(),
        nome: nomeCurso,
        periodo: periodoMax,
      };

      setCursos([...cursos, novoCurso]);
      setModalVisible(false);
      setNomeCurso('');
      setPeriodoMax('');
    } else {
      alert('Preencha todos os campos!');
    }
  };

  const renderCurso = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cursoNome}>{item.nome}</Text>
      <Text style={styles.cursoPeriodo}>Período Máximo: {item.periodo}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.novoButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.novoButtonText}>Novo</Text>
      </TouchableOpacity>

      {/* Modal de cadastro */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Cadastrar Curso</Text>

            <TextInput
              style={styles.input}
              placeholder="Nome do Curso"
              value={nomeCurso}
              onChangeText={setNomeCurso}
            />

            <TextInput
              style={styles.input}
              placeholder="Período Máximo"
              value={periodoMax}
              onChangeText={setPeriodoMax}
              keyboardType="numeric"
            />

            <TouchableOpacity style={styles.button} onPress={handleSalvarCurso}>
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, { backgroundColor: '#888' }]} onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Lista de cursos */}
      <FlatList
        data={cursos}
        keyExtractor={(item) => item.id}
        renderItem={renderCurso}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>Nenhum curso cadastrado.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  novoButton: {
    backgroundColor: '#0D47A1',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  novoButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 12,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#0D47A1',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#E3F2FD',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    elevation: 2,
  },
  cursoNome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0D47A1',
  },
  cursoPeriodo: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
  },
});

export default CursosScreen;
