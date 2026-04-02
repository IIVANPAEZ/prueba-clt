import React from 'react';
import {View, FlatList, Text, StyleSheet} from 'react-native';
import {useAppSelector} from '../hooks/useAppDispatch';
import ProductCard from '../components/ProductCard';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../navigation/types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'HomeTabs'>;
};

const FavoritesScreen: React.FC<Props> = ({navigation}) => {
  const {ids, entities} = useAppSelector(state => state.favorites);
  const favorites = ids.map(id => entities[id]).filter(Boolean);

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <ProductCard
            product={item}
            onPress={() => navigation.navigate('Detail', {product: item})}
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No tienes favoritos aun</Text>
            <Text style={styles.emptySubtext}>
              Agrega productos desde el detalle
            </Text>
          </View>
        }
        contentContainerStyle={favorites.length === 0 && styles.emptyContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
  emptyContainer: {
    flex: 1,
  },
});

export default FavoritesScreen;
