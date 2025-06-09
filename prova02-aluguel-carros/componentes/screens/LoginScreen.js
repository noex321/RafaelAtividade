import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
// 1. Importar as funções do Firestore e a instância do banco de dados
import { doc, getDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword } from 'firebase/auth';
// Supondo que seu arquivo de credenciais exporta 'auth' e 'db' (firestore)
import auth from '../services/credenciaisFirebaseAuth'; // <--- Sem as chaves
import { db } from '../services/credenciaisFirebase';
import globalStyles from '../styles/globalStyles';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false); // Estado para controlar o loading

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Atenção', 'Preencha o e-mail e a senha.');
      return;
    }
    setLoading(true); // Ativa o indicador de loading

    try {
      // Tenta fazer o login com o Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      // 2. Com o login bem-sucedido, busca o documento do usuário no Firestore
      const userDocRef = doc(db, 'usuario', user.uid);
      const userDoc = await getDoc(userDocRef);

      // 3. Verifica se o documento do usuário existe
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const userType = userData.tipo; // Pega o campo 'tipo' do documento

        // 4. Redireciona com base no tipo de usuário
        // Usamos 'replace' para que o usuário não possa voltar para a tela de login
        if (userType === 'administrador') {
          navigation.replace('InicioAdmin');
        } else if (userType === 'Avaliador') {
          navigation.replace('InicioAvaliador');
        } else if (userType === 'Aluno') {
          navigation.replace('InicioAlunos');
        } else {
          // Caso o campo 'tipo' não seja um dos esperados
          Alert.alert('Erro', 'Tipo de usuário desconhecido.');
          auth.signOut(); // Desloga por segurança
        }
      } else {
        // Caso o usuário exista no Auth mas não tenha perfil no Firestore
        Alert.alert('Erro de Perfil', 'Usuário não encontrado na base de dados.');
        auth.signOut(); // Desloga o usuário
      }
    } catch (error) {
      Alert.alert('Falha no Login', 'E-mail ou senha inválidos.');
      console.error(error);
    } finally {
      setLoading(false); // Desativa o indicador de loading
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Login</Text>
      <TextInput
        placeholder="Email"
        style={globalStyles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Senha"
        style={globalStyles.input}
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />
      <TouchableOpacity style={globalStyles.button} onPress={handleLogin} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={globalStyles.buttonText}>Entrar</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}