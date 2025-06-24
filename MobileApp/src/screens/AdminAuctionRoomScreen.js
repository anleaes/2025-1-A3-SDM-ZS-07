import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colors from '../styles/colors';
import { createAuction, getAuctions, deleteAuction } from '../services/auctionService';

export default function AdminAuctionRoomScreen() {
  const [auctionName, setAuctionName] = useState('');
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const fetchAuctions = async () => {
    setLoading(true);
    try {
      const data = await getAuctions();
      setAuctions(data);
    } catch (error) {
      Alert.alert('Erro', 'Erro ao carregar as salas de leilão');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAuctions();
  }, []);

  const handleCreateAuction = async () => {
    if (!auctionName.trim()) {
      Alert.alert('Aviso', 'Digite um nome para a sala');
      return;
    }
    
    setLoading(true);
    try {
      const newAuction = await createAuction({ name: auctionName });
      setAuctions([newAuction, ...auctions]);
      setAuctionName('');
      Alert.alert('Sucesso', 'Sala criada com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Erro ao criar sala');
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    Alert.alert('Excluir Sala', 'Tem certeza que deseja excluir?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteAuction(id);
            setAuctions(auctions.filter((item) => item.id !== id));
            Alert.alert('Sucesso', 'Sala excluída com sucesso!');
          } catch (err) {
            Alert.alert('Erro', 'Erro ao excluir sala');
          }
        },
      },
    ]);
  };

  const renderAuctionItem = ({ item }) => (
    <TouchableOpacity
      style={styles.auctionItem}
      onPress={() => navigation.navigate('AuctionDetails', { auction: item })}
    >
      <View style={styles.auctionInfo}>
        <Text style={styles.auctionText}>{item.name}</Text>
        <Text style={styles.auctionSubText}>
          Criado em: {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A'}
        </Text>
      </View>
      <TouchableOpacity 
        style={styles.deleteButton}
        onPress={() => handleDelete(item.id)}
      >
        <Text style={styles.deleteText}>Excluir</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gerenciar Salas de Leilão</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nome da nova sala"
          placeholderTextColor="#aaa"
          value={auctionName}
          onChangeText={setAuctionName}
          editable={!loading}
        />

        <TouchableOpacity 
          style={[styles.button, loading && styles.buttonDisabled]} 
          onPress={handleCreateAuction}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Criando...' : 'Criar Sala'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.listContainer}>
        <Text style={styles.listTitle}>Salas Existentes</Text>
        {loading ? (
          <ActivityIndicator size="large" color={colors.gold} style={styles.loader} />
        ) : (
          <FlatList
            data={auctions}
            keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
            renderItem={renderAuctionItem}
            ListEmptyComponent={
              <Text style={styles.emptyText}>Nenhuma sala de leilão encontrada</Text>
            }
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#222',
    color: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  button: {
    backgroundColor: colors.gold,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: colors.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonDisabled: {
    backgroundColor: '#666',
    shadowOpacity: 0.1,
  },
  buttonText: {
    color: colors.black,
    fontWeight: 'bold',
    fontSize: 16,
  },
  listContainer: {
    flex: 1,
  },
  listTitle: {
    color: colors.gold,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  auctionItem: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    borderLeftWidth: 3,
    borderLeftColor: colors.gold,
  },
  auctionInfo: {
    flex: 1,
  },
  auctionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  auctionSubText: {
    color: '#aaa',
    fontSize: 12,
    marginTop: 4,
  },
  deleteButton: {
    backgroundColor: '#ff4444',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  loader: {
    marginTop: 50,
  },
  emptyText: {
    color: '#777',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 30,
    fontSize: 16,
  },
});