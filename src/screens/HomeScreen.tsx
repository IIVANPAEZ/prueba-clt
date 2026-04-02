import React, {useEffect, useCallback} from 'react';
import {View, FlatList, StyleSheet, RefreshControl} from 'react-native';
import {ActivityIndicator, Text, Button} from 'react-native-paper';
import {useAppDispatch, useAppSelector} from '../hooks/useAppDispatch';
import {
  getProducts,
  searchByQuery,
  resetProducts,
} from '../store/slices/productsSlice';
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
      dispatch(searchByQuery(query));
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
          <ActivityIndicator size="small" color="#1565C0" />
        </View>
      );
    }
    return null;
  };

  const renderContent = () => {
    if (status === 'loading' && items.length === 0) {
      return (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#1565C0" />
          <Text variant="bodyLarge" style={styles.loadingText}>
            Cargando productos...
          </Text>
        </View>
      );
    }

    if (status === 'failed' && items.length === 0) {
      return (
        <View style={styles.center}>
          <Text variant="bodyLarge" style={styles.errorText}>
            {error}
          </Text>
          <Button
            mode="contained"
            onPress={handleRefresh}
            buttonColor="#1565C0"
            textColor="#fff"
            style={styles.retryButton}
            icon="refresh">
            Reintentar
          </Button>
        </View>
      );
    }

    return (
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
            colors={['#1565C0']}
            tintColor="#1565C0"
          />
        }
        ListEmptyComponent={
          status === 'succeeded' ? (
            <View style={styles.center}>
              <Text variant="bodyLarge" style={styles.emptyText}>
                No se encontraron productos
              </Text>
            </View>
          ) : null
        }
        contentContainerStyle={items.length === 0 && styles.emptyContainer}
      />
    );
  };

  return (
    <View style={styles.container}>
      <SearchBar onSearch={handleSearch} />
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 16,
    color: '#546E7A',
  },
  errorText: {
    color: '#D32F2F',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    borderRadius: 10,
  },
  footer: {
    paddingVertical: 24,
  },
  emptyText: {
    color: '#90A4AE',
  },
  emptyContainer: {
    flex: 1,
  },
});

export default HomeScreen;
