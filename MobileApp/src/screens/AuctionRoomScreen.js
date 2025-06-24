import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Animated,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import colors from '../styles/colors';
import { placeBid, getBidsForAuction } from '../services/auctionService';

export default function AuctionRoomScreen() {
  const [bid, setBid] = useState('');
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const route = useRoute();
  
  // Se vier de AdminAuctionRoomScreen, teremos o parâmetro auction
  const auction = route.params?.auction;

  useEffect(() => {
    if (auction?.id) {
      fetchBids();
      // Aqui você pode implementar polling para atualizar lances em tempo real
      const interval = setInterval(fetchBids, 5000); // Atualiza a cada 5 segundos
      return () => clearInterval(interval);
    }
  }, [auction]);

  const fetchBids = async () => {
    if (!auction?.id) return;
    
    try {
      setRefreshing(true);
      const data = await getBidsForAuction(auction.id);
      setBids(data.sort((a, b) => b.amount - a.amount)); // Ordena por valor (maior primeiro)
    } catch (error) {
      console.error('Erro ao buscar lances:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const handlePlaceBid = async () => {
    if (!bid || isNaN(bid)) {
      Alert.alert('Aviso', 'Digite um valor válido.');
      return;
    }

    const bidAmount = parseFloat(bid);
    if (bidAmount <= 0) {
      Alert.alert('Aviso', 'O lance deve ser maior que zero.');
      return;
    }

    // Verificar se o lance é maior que o último lance
    if (bids.length > 0 && bidAmount <= bids[0].amount) {
      Alert.alert('Aviso', `Seu lance deve ser maior que R$ ${bids[0].amount.toFixed(2)}`);
      return;
    }

    setLoading(true);
    try {
      const newBid = await placeBid({
        auction: auction?.id,
        amount: bidAmount,
      });

      setBids([newBid, ...bids]);
      setBid('');

      // Animação de sucesso
      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }).start();

      Alert.alert('Sucesso', 'Lance realizado com sucesso!');
    } catch (error) {
      Alert.alert('Erro', error.message || 'Erro ao fazer lance');
    } finally {
      setLoading(false);
    }
  };

  const renderBidItem = ({ item, index }) => (
    <Animated.View style={[
      styles.bidItem,
      index === 0 && styles.highestBid,
      { opacity: index === 0 ? fadeAnim : 1 }
    ]}>
      <View style={styles.bidContent}>
        <Text style={styles.bidAmount}>💰 R$ {item.amount.toFixed(2)}</Text>
        <Text style={styles.bidUser}>
          {item.user ? `Por: ${item.user}` : 'Usuário anônimo'}
        </Text>
        <Text style={styles.bidTime}>
          {item.createdAt ? new Date(item.createdAt).toLocaleTimeString() : 'Agora'}
        </Text>
      </View>
      {index === 0 && <Text style={styles.winningLabel}>🏆 MAIOR LANCE</Text>}
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        🔥 {auction?.name || 'Sala de Leilão'}
      </Text>

      {bids.length > 0 && (
        <View style={styles.currentBidContainer}>
          <Text style={styles.currentBidLabel}>Lance Atual:</Text>
          <Text style={styles.currentBidAmount}>R$ {bids[0].amount.toFixed(2)}</Text>
        </View>
      )}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={bids.length > 0 ? `Mínimo: R$ ${(bids[0].amount + 0.01).toFixed(2)}` : "Digite seu lance"}
          placeholderTextColor="#aaa"
          keyboardType="numeric"
          value={bid}
          onChangeText={setBid}
          editable={!loading}
        />

        <TouchableOpacity 
          style={[styles.button, loading && styles.buttonDisabled]} 
          onPress={handlePlaceBid} 
          activeOpacity={0.8}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={colors.black} />
          ) : (
            <Text style={styles.buttonText}>Dar Lance</Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.bidsContainer}>
        <Text style={styles.subtitle}>📋 Histórico de Lances</Text>

        <FlatList
          data={bids}
          keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
          renderItem={renderBidItem}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              {refreshing ? 'Carregando lances...' : 'Nenhum lance ainda. Seja o primeiro!'}
            </Text>
          }
          refreshing={refreshing}
          onRefresh={fetchBids}
          showsVerticalScrollIndicator={false}
        />
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
    fontSize: 24,
    color: colors.gold,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  currentBidContainer: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: colors.gold,
  },
  currentBidLabel: {
    color: '#ccc',
    fontSize: 14,
  },
  currentBidAmount: {
    color: colors.gold,
    fontSize: 28,
    fontWeight: 'bold',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.gold,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: '#fff',
    fontSize: 16,
    marginBottom: 12,
    backgroundColor: '#222',
  },
  button: {
    backgroundColor: colors.gold,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: colors.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 6,
  },
  buttonDisabled: {
    backgroundColor: '#666',
    shadowOpacity: 0.1,
  },
  buttonText: {
    color: colors.black,
    fontSize: 16,
    fontWeight: 'bold',
  },
  bidsContainer: {
    flex: 1,
  },
  subtitle: {
    fontSize: 18,
    color: colors.gold,
    marginBottom: 10,
    fontWeight: '600',
  },
  bidItem: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#555',
  },
  highestBid: {
    borderLeftColor: colors.gold,
    backgroundColor: '#2a2a2a',
  },
  bidContent: {
    flexDirection: 'column',
  },
  bidAmount: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bidUser: {
    color: '#aaa',
    fontSize: 12,
    marginTop: 2,
  },
  bidTime: {
    color: '#666',
    fontSize: 10,
    marginTop: 2,
  },
  winningLabel: {
    color: colors.gold,
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 5,
  },
  emptyText: {
    color: '#777',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 30,
    fontSize: 16,
  },
});