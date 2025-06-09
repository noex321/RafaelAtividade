import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, FlatList, StyleSheet } from 'react-native';
import { collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../services/credenciaisFirebase';
import globalStyles from '../styles/globalStyles';

export default function GerenciarCursosScreen() {
  // Estado para o formulário
  const [form, setForm] = useState({ nome: '', duracao: '', coordenador: '' });
  // Estado para armazenar a lista de cursos vinda do Firebase
  const [cursos, setCursos] = useState([]);
  // Estado para controlar se estamos editando um curso existente
  const [editingCursoId, setEditingCursoId] = useState(null);

  // Efeito para buscar e ouvir as atualizações da coleção 'cursos' em tempo real
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'cursos'), (snapshot) => {
      const cursosData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCursos(cursosData);
    });

    // Limpa o listener quando o componente é desmontado
    return () => unsubscribe();
  }, []);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  // Função para CRIAR ou ATUALIZAR um curso
  const handleSalvar = async () => {
    const { nome, duracao, coordenador } = form;

    if (!nome || !duracao || !coordenador) {
      Alert.alert('Atenção', 'Preencha todos os campos!');
      return;
    }

    try {
      if (editingCursoId) {
        // Se estamos editando, ATUALIZA o documento existente
        const cursoRef = doc(db, 'cursos', editingCursoId);
        await updateDoc(cursoRef, {
          nomeCurso: nome,
          duracaoAnos: parseInt(duracao),
          nomeCoordenador: coordenador,
        });
        Alert.alert('Sucesso', 'Curso atualizado!');
      } else {
        // Se não, CRIA um novo documento
        await addDoc(collection(db, 'cursos'), {
          nomeCurso: nome,
          duracaoAnos: parseInt(duracao),
          nomeCoordenador: coordenador,
          createdAt: new Date(),
        });
        Alert.alert('Sucesso', 'Curso cadastrado!');
      }
      // Limpa o formulário e o estado de edição
      setForm({ nome: '', duracao: '', coordenador: '' });
      setEditingCursoId(null);
    } catch (error) {
      console.error("Erro ao salvar curso: ", error);
      Alert.alert('Erro', 'Ocorreu um erro ao salvar o curso.');
    }
  };
  
  // Função para preparar o formulário para EDIÇÃO
  const handleEditar = (curso) => {
    setForm({
      nome: curso.nomeCurso,
      duracao: curso.duracaoAnos.toString(),
      coordenador: curso.nomeCoordenador,
    });
    setEditingCursoId(curso.id);
  };

  // Função para DELETAR um curso
  const handleDeletar = (id) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Você tem certeza que deseja excluir este curso?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', style: 'destructive', onPress: () => deleteDoc(doc(db, 'cursos', id)) }
      ]
    );
  };

  // Componente que renderiza cada item da lista de cursos
  const renderCursoItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemTitle}>{item.nomeCurso}</Text>
        <Text style={styles.itemSubtitle}>{item.duracaoAnos} anos - Coord. {item.nomeCoordenador}</Text>
      </View>
      <View style={styles.itemActions}>
        <TouchableOpacity onPress={() => handleEditar(item)}>
          <Text style={styles.editButton}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeletar(item.id)}>
          <Text style={styles.deleteButton}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={globalStyles.container}>
      {/* Formulário de Cadastro/Edição */}
      <View style={styles.formContainer}>
        <Text style={globalStyles.title}>{editingCursoId ? 'Editar Curso' : 'Cadastrar Curso'}</Text>
        <TextInput
          placeholder="Nome do Curso"
          style={globalStyles.input}
          value={form.nome}
          onChangeText={(v) => handleChange('nome', v)}
        />
        <TextInput
          placeholder="Duração (em anos)"
          style={globalStyles.input}
          value={form.duracao}
          onChangeText={(v) => handleChange('duracao', v)}
          keyboardType="numeric"
        />
        <TextInput
          placeholder="Nome do Coordenador"
          style={globalStyles.input}
          value={form.coordenador}
          onChangeText={(v) => handleChange('coordenador', v)}
        />
        <TouchableOpacity style={globalStyles.button} onPress={handleSalvar}>
          <Text style={globalStyles.buttonText}>{editingCursoId ? 'Atualizar Curso' : 'Salvar Novo Curso'}</Text>
        </TouchableOpacity>
        {editingCursoId && (
            <TouchableOpacity style={[globalStyles.button, styles.cancelButton]} onPress={() => {
                setForm({ nome: '', duracao: '', coordenador: '' });
                setEditingCursoId(null);
            }}>
                <Text style={globalStyles.buttonText}>Cancelar Edição</Text>
            </TouchableOpacity>
        )}
      </View>

      {/* Lista de Cursos Cadastrados */}
      <FlatList
        data={cursos}
        renderItem={renderCursoItem}
        keyExtractor={item => item.id}
        style={styles.list}
      />
    </View>
  );
}

// Estilos específicos para esta tela
const styles = StyleSheet.create({
    formContainer: {
        width: '100%',
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    list: {
        width: '100%',
        marginTop: 20,
    },
    itemContainer: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    itemTextContainer: {
        flex: 1,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    itemSubtitle: {
        fontSize: 14,
        color: '#666',
    },
    itemActions: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    editButton: {
        color: '#007BFF',
        fontWeight: 'bold',
        marginRight: 15,
    },
    deleteButton: {
        color: '#dc3545',
        fontWeight: 'bold',
    },
    cancelButton: {
      backgroundColor: '#6c757d', // Cor cinza para cancelar
      marginTop: 10,
    }
});