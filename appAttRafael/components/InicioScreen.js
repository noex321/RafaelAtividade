import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { CurrentRenderContext } from '@react-navigation/native';

const InicioScreen = ({ navigation }) => {
  const [cursoSelecionado, setCursoSelecionado] = useState('');
  const [periodoSelecionado, setPeriodoSelecionado] = useState('');

  const telaAnalisaCurso = () => {
    if (cursoSelecionado && periodoSelecionado) {
      navigation.navigate('ProjetosScreen', { curso: cursoSelecionado, periodo: periodoSelecionado });
    } else {
      alert('Selecione o curso e o período');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Selecione o Curso que deseja análisar</Text>

      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={cursoSelecionado}
          dropdownIconColor="#FFFFFF"
          onValueChange={(itemValue) => setCursoSelecionado(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Selecione..." value="" />
          <Picker.Item label="Curso A" value="cursoA" />
          <Picker.Item label="Curso B" value="cursoB" />
          <Picker.Item label="Curso C" value="cursoC" />
        </Picker>
      </View>

      {/* Condicional: só mostra o segundo Picker se algo foi selecionado */}
      {cursoSelecionado !== '' && (
        <>
          <Text style={styles.headerText}>Selecione o Periodo</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={periodoSelecionado}
              dropdownIconColor="#FFFFFF"
              onValueChange={(itemValue) => setPeriodoSelecionado(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Escolha o Periodo..." value="" />
              <Picker.Item label="1º" value="1" />
              <Picker.Item label="2º" value="2" />
              <Picker.Item label="3º" value="3" />
            </Picker>
          </View>
        </>
      )}

      {periodoSelecionado !== '' && (
        <>
          <TouchableOpacity style={styles.button} onPress={telaAnalisaCurso}>
            <Text style={styles.buttonText}>Analisar</Text>
          </TouchableOpacity>
        </>
      )}
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
  pickerWrapper: {
    backgroundColor: '#0D47A1',
    borderRadius: 25,
    overflow: 'hidden',
    marginBottom: 20,
  },
  picker: {
    height: 60,
    color: '#FFFFFF',
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 15,
    color: '#000000',
    marginBottom: 15,
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#0D47A1',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    width: '50%',
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default InicioScreen;
