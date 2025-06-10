import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, FlatList, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../services/credenciaisFirebase';
import globalStyles from '../styles/globalStyles';

export default function GerenciarTemasScreen() {
  // Estado para o formulário de tema
  const [form, setForm] = useState({ titulo: '', descricao: '', cursoAlvo: '', professorResponsavel: '' });
  // Estado para a lista de temas
  const [temas, setTemas] = useState([]);
  // Estado para controlar a edição
  const [editingTemaId, setEditingTemaId] = useState(null);

  // Efeito para ouvir a coleção 'temas' em tempo real
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'temas'), (snapshot) => {
      const temasData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTemas(temasData);
    });
    return () => unsubscribe();
  }, []);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  // Função para Salvar (Criar ou Atualizar) Tema
  const handleSalvarTema = async () => {
    const { titulo, descricao, cursoAlvo, professorResponsavel } = form;

    if (!titulo || !descricao || !cursoAlvo || !professorResponsavel) {
      Alert.alert('Atenção', 'Preencha todos os campos do tema!');
      return;
    }

    const temaData = {
        titulo: titulo,
        descricao: descricao,
        cursoAlvo: cursoAlvo,
        professorResponsavel: professorResponsavel,
    };

    try {
      if (editingTemaId) {
        // Atualiza o tema existente
        const temaRef = doc(db, 'temas', editingTemaId);
        await updateDoc(temaRef, temaData);
        Alert.alert('Sucesso', 'Tema atualizado!');
      } else {
        // Cria um novo tema
        await addDoc(collection(db, 'temas'), {
            ...temaData,
            createdAt: new Date(),
        });
        Alert.alert('Sucesso', 'Tema cadastrado!');
      }
      setForm({ titulo: '', descricao: '', cursoAlvo: '', professorResponsavel: '' });
      setEditingTemaId(null);
    } catch (error) {
      console.error("Erro ao salvar tema: ", error);
      Alert.alert('Erro', 'Ocorreu um erro ao salvar o tema.');
    }
  };
  
  // Prepara o formulário para edição
  const handleEditarTema = (tema) => {
    setForm({
      titulo: tema.titulo,
      descricao: tema.descricao,
      cursoAlvo: tema.cursoAlvo,
      professorResponsavel: tema.professorResponsavel,
    });
    setEditingTemaId(tema.id);
  };

  // Deleta um tema
  const handleDeletarTema = (id) => {
    Alert.alert('Confirmar Exclusão', 'Você tem certeza que deseja excluir este tema?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', style: 'destructive', onPress: () => deleteDoc(doc(db, 'temas', id)) }
      ]
    );
  };

  // Componente que renderiza cada tema na lista
  const renderTemaItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemTitle}>{item.titulo}</Text>
        <Text style={styles.itemSubtitle}>Curso: {item.cursoAlvo}</Text>
        <Text style={styles.itemDescription} numberOfLines={2}>{item.descricao}</Text>
      </View>
      <View style={styles.itemActions}>
        <TouchableOpacity onPress={() => handleEditarTema(item)}>
          <Text style={styles.editButton}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeletarTema(item.id)}>
          <Text style={styles.deleteButton}>Deletar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={globalStyles.container}
    >
      {/* Formulário */}
      <View style={styles.formContainer}>
        <Text style={globalStyles.title}>{editingTemaId ? 'Editar Tema' : 'Cadastrar Tema'}</Text>
        <TextInput placeholder="Título" style={globalStyles.input} value={form.titulo} onChangeText={(v) => handleChange('titulo', v)} />
        <TextInput 
            placeholder="Descrição" 
            style={[globalStyles.input, {textAlignVertical: 'top'}]} 
            value={form.descricao} 
            onChangeText={(v) => handleChange('descricao', v)}
            multiline={true}
            numberOfLines={4}
        />
        <TextInput placeholder="Curso" style={globalStyles.input} value={form.cursoAlvo} onChangeText={(v) => handleChange('cursoAlvo', v)} />
        <TextInput placeholder="Responsável" style={globalStyles.input} value={form.professorResponsavel} onChangeText={(v) => handleChange('professorResponsavel', v)} />
        
        <TouchableOpacity style={globalStyles.button} onPress={handleSalvarTema}>
          <Text style={globalStyles.buttonText}>{editingTemaId ? 'Atualizar Tema' : 'Cadastrar Tema'}</Text>
        </TouchableOpacity>

        {editingTemaId && (
            <TouchableOpacity style={[globalStyles.button, styles.cancelButton]} onPress={() => {
                setForm({ titulo: '', descricao: '', cursoAlvo: '', professorResponsavel: '' });
                setEditingTemaId(null);
            }}>
                <Text style={globalStyles.buttonText}>Cancelar Edição</Text>
            </TouchableOpacity>
        )}
      </View>

      {/* Lista de Temas */}
      <FlatList
        data={temas}
        renderItem={renderTemaItem}
        keyExtractor={item => item.id}
        style={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </KeyboardAvoidingView>
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
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    itemTextContainer: {
        flex: 1,
        marginRight: 10,
    },
    itemTitle: {
        fontSize: 16,
        color: '#333',
    },
    itemSubtitle: {
        fontSize: 14,
        color: '#666',
        fontStyle: 'italic',
    },
    itemDescription: {
        fontSize: 14,
        color: '#555',
        marginTop: 5,
    },
    itemActions: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    editButton: {
        fontWeight: 'bold',
        marginRight: 15,
    },
    deleteButton: {
        fontWeight: 'bold',
    },
    cancelButton: {
      backgroundColor: '#6c757d',
      marginTop: 10,
    }
});