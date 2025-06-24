// src/screens/AuctionDetailsScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../styles/colors';

export default function AuctionDetailsScreen({ route }) {
  const { auction } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes do Leilão</Text>
      <Text style={styles.label}>Nome da Sala:</Text>
      <Text style={styles.value}>{auction.name}</Text>
      {/* Aqui você pode expandir com mais dados futuramente */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: colors.gold,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    color: '#ccc',
    marginBottom: 4,
  },
  value: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
});
