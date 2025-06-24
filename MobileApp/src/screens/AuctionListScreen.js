import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colors from '../styles/colors';
import { getAuctions } from '../services/auctionService';

export default function AuctionListScreen() {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  const fetchAuctions = async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    try {
      const data = await getAuctions();
      setAuctions(data);
    } catch (error) {
      Alert.alert('Erro', 'Erro ao carregar leilões disponíveis');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAuctions();
  }, []);

  const handleJoinAuction = (auction) => {
    navigation.navigate('AuctionRoom', { auction });
  };

  const renderAuctionItem = ({ item }) => (
    <TouchableOpacity
      style={styles.auctionCard}
      onPress={() => handleJoinAuction(item)}
      activeOpacity={0.8}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.auctionName}>{item.name}</Text>
        <Text style={styles.statusBradge}>🟢 ATIVO</Text>
      </View>
      
      <View style={styles.cardBody}>
        <Text style={styles.infoText}>
          📅 Criado em: {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A'}
        </Text>
        
        {item.currentBid && (
          <Text style={styles.currentBid}>
            💰 Lance atual: R$ {item.currentBid.toFixed(2)}
          </Text>
        )}
        
        <Text style={styles.participantsText}>
          👥 {item.participantCount || 0} participantes
        </Text>
      </View>

      <View style={styles.cardFooter}>
        <Text style={styles.joinText}>Toque para participar →</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={colors.gold} />
        <Text style={styles.loadingText}>Carregando leilões...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏆 Leilões Disponíveis</Text>
      <Text style={styles.subtitle}>Escolha um leilão para participar</Text>

      <FlatList
        data={auctions}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        renderItem={renderAuctionItem}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => fetchAuctions(true)}
            colors={[colors.gold]}
            tintColor={colors.gold}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>📭 Nenhum leilão disponível</Text>
            <Text style={styles.emptySubText}>
              Puxe para baixo para atualizar
            </Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={auctions.length === 0 ? styles.emptyList : null}
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
  centerContainer: {
    flex: 1,
    backgroundColor: colors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: colors.gold,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    color: '#ccc',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  loadingText: {
    color: colors.gold,
    marginTop: 10,
    fontSize: 16,
  },
  auctionCard: {
    backgroundColor: '#333',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: colors.gold,
    shadowColor: colors.gold,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  auctionName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  statusBradge: {
    backgroundColor: '#2d5a2d',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    fontSize: 10,
    color: '#90ee90',
  },
  cardBody: {
    marginBottom: 12,
  },
  infoText: {
    color: '#aaa',
    fontSize: 12,
    marginBottom: 4,
  },
  currentBid: {
    color: colors.gold,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  participantsText: {
    color: '#ccc',
    fontSize: 12,
  },
  cardFooter: {
    borderTopWidth: 1,
    borderTopColor: '#555',
    paddingTop: 8,
  },
  joinText: {
    color: colors.gold,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  emptyList: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    color: '#777',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emptySubText: {
    color: '#555',
    fontSize: 14,
    fontStyle: 'italic',
  },
});