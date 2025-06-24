import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import colors from '../styles/colors';

export default function AuctionRoomScreen() {
  const [bid, setBid] = useState('');
  const [bids, setBids] = useState([]);

  const handlePlaceBid = () => {
    if (!bid || isNaN(bid)) {
      alert('Digite um valor válido.');
      return;
    }
    const newBid = {
      id: Date.now().toString(),
      amount: parseFloat(bid),
    };
    setBids([newBid, ...bids]);
    setBid('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sala de Leilão</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite seu lance"
        placeholderTextColor="#ccc"
        keyboardType="numeric"
        value={bid}
        onChangeText={setBid}
      />

      <TouchableOpacity style={styles.button} onPress={handlePlaceBid}>
        <Text style={styles.buttonText}>Dar Lance</Text>
      </TouchableOpacity>

      <Text style={styles.subtitle}>Lances Recentes</Text>
      <FlatList
        data={bids}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={styles.bidItem}>R$ {item.amount.toFixed(2)}</Text>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum lance ainda.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    padding: 24,
  },
  title: {
    fontSize: 24,
    color: colors.gold,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.gold,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#fff',
    marginBottom: 12,
  },
  button: {
    backgroundColor: colors.gold,
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: colors.black,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  subtitle: {
    fontSize: 18,
    color: colors.gold,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  bidItem: {
    color: '#fff',
    paddingVertical: 4,
    borderBottomColor: '#444',
    borderBottomWidth: 1,
  },
  emptyText: {
    color: '#888',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 16,
  },
});
