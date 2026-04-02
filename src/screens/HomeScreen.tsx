import React, {useEffect, useCallback} from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../hooks/useAppDispatch';
import {getProducts, setSearchQuery, resetProducts} from '../store/slices/productsSlice';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../navigation/types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'HomeTabs'>;
};

const HomeScreen: React.FC<Props> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const {items, status, error, hasMore} = useAppSelector(
    state => state.products,
  );

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleSearch = useCallback(
    (query: string) => {
      dispatch(setSearchQuery(query));
      dispatch(getProducts());
    },
    [dispatch],
  );

  const handleLoadMore = useCallback(() => {
    if (status !== 'loading' && hasMore) {
      dispatch(getProducts());
    }
  }, [dispatch, status, hasMore]);

  const handleRefresh = useCallback(() => {
    dispatch(resetProducts());
    dispatch(getProducts());
  }, [dispatch]);

  const renderFooter = () => {
    if (status === 'loading' && items.length > 0) {
      return (
        <View style={styles.footer}>
          <ActivityIndicator size="small" color="#2a9d8f" />
        </View>
      );
    }
    return null;
  };

  if (status === 'loading' && items.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2a9d8f" />
        <Text style={styles.loadingText}>Cargando productos...</Text>
      </View>
    );
  }

  if (status === 'failed' && items.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={handleRefresh}>
          <Text style={styles.retryText}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SearchBar onSearch={handleSearch} />
      <FlatList
        data={items}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <ProductCard
            product={item}
            onPress={() => navigation.navigate('Detail', {product: item})}
          />
        )}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={handleRefresh}
            colors={['#2a9d8f']}
            tintColor="#2a9d8f"
          />
        }
        ListEmptyComponent={
          <View style={styles.center}>
            <Text style={styles.emptyText}>No se encontraron productos</Text>
          </View>
        }
        contentContainerStyle={items.length === 0 && styles.emptyContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#e63946',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#2a9d8f',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    paddingVertical: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
  emptyContainer: {
    flex: 1,
  },
});

export default HomeScreen;
