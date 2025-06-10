import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, FlatList, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../services/credenciaisFirebase';
import globalStyles from '../styles/globalStyles';

export default function GerenciarAlunosScreen() {
  // Estado para o formulário de aluno
  const [form, setForm] = useState({ nome: '', email: '', matricula: '', curso: '', periodo: '' });
  // Estado para a lista de alunos
  const [alunos, setAlunos] = useState([]);
  // Estado para controlar a edição
  const [editingAlunoId, setEditingAlunoId] = useState(null);

  // Efeito para ouvir a coleção 'alunos' em tempo real
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'alunos'), (snapshot) => {
      const alunosData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAlunos(alunosData);
    });
    return () => unsubscribe();
  }, []);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  // Função para Salvar (Criar ou Atualizar) Aluno
  const handleSalvarAluno = async () => {
    const { nome, email, matricula, curso, periodo } = form;

    if (!nome || !email || !matricula || !curso || !periodo) {
      Alert.alert('Atenção', 'Preencha todos os campos do aluno!');
      return;
    }

    const alunoData = {
        nomeCompleto: nome,
        email: email,
        numeroMatricula: matricula,
        nomeCurso: curso,
        periodoAtual: parseInt(periodo),
    };

    try {
      if (editingAlunoId) {
        // Atualiza o aluno existente
        const alunoRef = doc(db, 'alunos', editingAlunoId);
        await updateDoc(alunoRef, alunoData);
        Alert.alert('Sucesso', 'Aluno atualizado!');
      } else {
        // Cria um novo aluno
        await addDoc(collection(db, 'alunos'), {
            ...alunoData,
            createdAt: new Date(),
        });
        Alert.alert('Sucesso', 'Aluno cadastrado!');
      }
      // Limpa o formulário e o estado de edição
      setForm({ nome: '', email: '', matricula: '', curso: '', periodo: '' });
      setEditingAlunoId(null);
    } catch (error) {
      console.error("Erro ao salvar aluno: ", error);
      Alert.alert('Erro', 'Ocorreu um erro ao salvar o aluno.');
    }
  };
  
  // Prepara o formulário para edição
  const handleEditarAluno = (aluno) => {
    setForm({
      nome: aluno.nomeCompleto,
      email: aluno.email,
      matricula: aluno.numeroMatricula,
      curso: aluno.nomeCurso,
      periodo: aluno.periodoAtual.toString(),
    });
    setEditingAlunoId(aluno.id);
  };

  // Deleta um aluno
  const handleDeletarAluno = (id) => {
    Alert.alert('Confirmar Exclusão', 'Você tem certeza que deseja excluir este aluno?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', style: 'destructive', onPress: () => deleteDoc(doc(db, 'alunos', id)) }
      ]
    );
  };

  // Componente que renderiza cada aluno na lista
  const renderAlunoItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemTitle}>{item.nomeCompleto}</Text>
        <Text style={styles.itemSubtitle}>Matrícula: {item.numeroMatricula}</Text>
        <Text style={styles.itemSubtitle}>{item.nomeCurso} - {item.periodoAtual}º Período</Text>
      </View>
      <View style={styles.itemActions}>
        <TouchableOpacity onPress={() => handleEditarAluno(item)}>
          <Text style={styles.editButton}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeletarAluno(item.id)}>
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
        <Text style={globalStyles.title}>{editingAlunoId ? 'Editar Aluno' : 'Cadastrar Aluno'}</Text>
        <TextInput placeholder="Nome" style={globalStyles.input} value={form.nome} onChangeText={(v) => handleChange('nome', v)} />
        <TextInput placeholder="Email" style={globalStyles.input} value={form.email} onChangeText={(v) => handleChange('email', v)} keyboardType="email-address" autoCapitalize="none" />
        <TextInput placeholder="Matrícula" style={globalStyles.input} value={form.matricula} onChangeText={(v) => handleChange('matricula', v)} keyboardType="numeric" />
        <TextInput placeholder="Curso" style={globalStyles.input} value={form.curso} onChangeText={(v) => handleChange('curso', v)} />
        <TextInput placeholder="Período" style={globalStyles.input} value={form.periodo} onChangeText={(v) => handleChange('periodo', v)} keyboardType="numeric" />
        
        <TouchableOpacity style={globalStyles.button} onPress={handleSalvarAluno}>
          <Text style={globalStyles.buttonText}>{editingAlunoId ? 'Atualizar Aluno' : 'Cadastrar Aluno'}</Text>
        </TouchableOpacity>

        {editingAlunoId && (
            <TouchableOpacity style={[globalStyles.button, styles.cancelButton]} onPress={() => {
                setForm({ nome: '', email: '', matricula: '', curso: '', periodo: '' });
                setEditingAlunoId(null);
            }}>
                <Text style={globalStyles.buttonText}>Cancelar Edição</Text>
            </TouchableOpacity>
        )}
      </View>

      {/* Lista de Alunos */}
      <FlatList
        data={alunos}
        renderItem={renderAlunoItem}
        keyExtractor={item => item.id}
        style={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </KeyboardAvoidingView>
  );
}

// Estilos específicos para esta tela (semelhantes aos de Cursos)
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
    },
    itemTextContainer: {
        flex: 1,
    },
    itemTitle: {
        fontSize: 16,
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
        fontWeight: 'bold',
        marginRight: 15,
    },
    deleteButton: {
        fontWeight: 'bold',
    },
    cancelButton: {
      backgroundColor: '#545454',
      marginTop: 10,
    }
});