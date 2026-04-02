import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../navigation/types';
import {useAppDispatch, useAppSelector} from '../hooks/useAppDispatch';
import {toggleFavorite} from '../store/slices/favoritesSlice';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

const DetailScreen: React.FC<Props> = ({route}) => {
  const {product} = route.params;
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector(state =>
    state.favorites.ids.includes(product.id),
  );

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(product));
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{uri: product.images?.[0] || product.thumbnail}}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        <Text style={styles.description}>{product.description}</Text>

        <TouchableOpacity
          style={[styles.favoriteButton, isFavorite && styles.favoriteButtonActive]}
          onPress={handleToggleFavorite}
          activeOpacity={0.7}>
          <Text
            style={[
              styles.favoriteText,
              isFavorite && styles.favoriteTextActive,
            ]}>
            {isFavorite ? 'Quitar de Favoritos' : 'Agregar a Favoritos'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300,
    backgroundColor: '#f0f0f0',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
  },
  price: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2a9d8f',
    marginTop: 8,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginTop: 16,
  },
  favoriteButton: {
    marginTop: 24,
    backgroundColor: '#f0f0f0',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#2a9d8f',
  },
  favoriteButtonActive: {
    backgroundColor: '#2a9d8f',
  },
  favoriteText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2a9d8f',
  },
  favoriteTextActive: {
    color: '#fff',
  },
});

export default DetailScreen;
