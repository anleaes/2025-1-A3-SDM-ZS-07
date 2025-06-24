// src/screens/AdminAuctionRoomScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import colors from '../styles/colors';

export default function AdminAuctionRoomScreen() {
  const [auctionName, setAuctionName] = useState('');
  const [auctions, setAuctions] = useState([]);

  const handleCreateAuction = () => {
    if (auctionName.trim() !== '') {
      setAuctions([...auctions, { id: Date.now().toString(), name: auctionName }]);
      setAuctionName('');
    }
  };

  const handleDelete = (id) => {
    setAuctions(auctions.filter((item) => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gerenciar Salas de Leilão</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome da nova sala"
        placeholderTextColor="#aaa"
        value={auctionName}
        onChangeText={setAuctionName}
      />

      <TouchableOpacity style={styles.button} onPress={handleCreateAuction}>
        <Text style={styles.buttonText}>Criar Sala</Text>
      </TouchableOpacity>

      <FlatList
        data={auctions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.auctionItem}>
            <Text style={styles.auctionText}>{item.name}</Text>
            <TouchableOpacity onPress={() => handleDelete(item.id)}>
              <Text style={styles.deleteText}>Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
        style={styles.list}
      />
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
    color: colors.gold,
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#222',
    color: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  button: {
    backgroundColor: colors.gold,
    padding: 14,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.black,
    fontWeight: 'bold',
    fontSize: 16,
  },
  list: {
    marginTop: 10,
  },
  auctionItem: {
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  auctionText: {
    color: '#fff',
  },
  deleteText: {
    color: 'red',
    fontWeight: 'bold',
  },
});
