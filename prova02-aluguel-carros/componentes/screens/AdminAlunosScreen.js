import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import globalStyles from '../styles/globalStyles';

export default function AdminHomeScreen({ navigation }) {
  return (

    <View style={globalStyles.container}>
      
      <Text style={globalStyles.title}>Painel do Admin</Text>

      <TouchableOpacity
        style={[globalStyles.button, styles.buttonSpacing]}
        onPress={() => navigation.navigate('CadastroTemas')}
      >
        <Text style={globalStyles.buttonText}>Temas</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
    buttonSpacing: {
        marginTop: 15,
    }
});