import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';

import { doc, getDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword } from 'firebase/auth';

import auth from '../services/credenciaisFirebaseAuth';
import { db } from '../services/credenciaisFirebase';
import globalStyles from '../styles/globalStyles';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Atenção', 'Preencha o e-mail e a senha.');
      return;
    }
    setLoading(true);

    try {

      const userCredential = await signInWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      const userDocRef = doc(db, 'pessoa', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const userType = userData.tipo;

        if (userType === 'administrador') {
          navigation.replace('InicioAdmin');
        } else if (userType === 'Avaliador') {
          navigation.replace('InicioAvaliador');
        } else if (userType === 'Aluno') {
          navigation.replace('InicioAlunos');
        } else {

          Alert.alert('Erro', 'Tipo de usuário desconhecido.');
          auth.signOut();
        }
      } else {

        Alert.alert('Erro de Perfil', 'Usuário não encontrado na base de dados.');
        auth.signOut();
      }
    } catch (error) {
      Alert.alert('Falha no Login', 'E-mail ou senha inválidos.');
      console.error(error);
    } finally {
      setLoading(false);
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