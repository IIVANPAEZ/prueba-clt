import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
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
            <Icon name="heart-outline" size={64} color="#BBDEFB" />
            <Text variant="titleMedium" style={styles.emptyText}>
              No tienes favoritos aun
            </Text>
            <Text variant="bodyMedium" style={styles.emptySubtext}>
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
    backgroundColor: '#F5F7FA',
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    color: '#546E7A',
    fontWeight: '600',
    marginTop: 16,
  },
  emptySubtext: {
    color: '#90A4AE',
    marginTop: 6,
  },
  emptyContainer: {
    flex: 1,
  },
});

export default FavoritesScreen;
