import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colors from '../styles/colors';

export default function HomeClienteScreen() {
  const navigation = useNavigation();

  const handleEntrarLeilao = () => {
    navigation.navigate('AuctionRoom'); // substituir conforme nome da tela de leilão
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo à Plataforma de Leilões</Text>

      <TouchableOpacity style={styles.button} onPress={handleEntrarLeilao}>
        <Text style={styles.buttonText}>Entrar em um Leilão</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    color: colors.gold,
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 32,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: colors.gold,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: colors.black,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
