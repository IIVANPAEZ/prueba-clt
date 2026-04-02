import React from 'react';
import {View, Image, StyleSheet, ScrollView} from 'react-native';
import {Text, Button, Chip} from 'react-native-paper';
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
        <View style={styles.header}>
          <Text variant="headlineSmall" style={styles.title}>
            {product.title}
          </Text>
          <Text variant="headlineMedium" style={styles.price}>
            ${product.price.toFixed(2)}
          </Text>
        </View>

        <View style={styles.chips}>
          {product.category && (
            <Chip style={styles.chip} textStyle={styles.chipText} icon="tag">
              {product.category}
            </Chip>
          )}
          {product.brand && (
            <Chip style={styles.chip} textStyle={styles.chipText} icon="store">
              {product.brand}
            </Chip>
          )}
          {product.rating && (
            <Chip
              style={styles.chipRating}
              textStyle={styles.chipRatingText}
              icon="star">
              {product.rating.toFixed(1)}
            </Chip>
          )}
        </View>

        <Text variant="bodyLarge" style={styles.description}>
          {product.description}
        </Text>

        <Button
          mode={isFavorite ? 'contained' : 'outlined'}
          onPress={handleToggleFavorite}
          icon={isFavorite ? 'heart' : 'heart-outline'}
          buttonColor={isFavorite ? '#1565C0' : undefined}
          textColor={isFavorite ? '#fff' : '#1565C0'}
          style={styles.favoriteButton}
          contentStyle={styles.favoriteContent}>
          {isFavorite ? 'Quitar de Favoritos' : 'Agregar a Favoritos'}
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  image: {
    width: '100%',
    height: 320,
    backgroundColor: '#E3F2FD',
  },
  content: {
    padding: 20,
  },
  header: {
    marginBottom: 12,
  },
  title: {
    color: '#1A1A2E',
    fontWeight: '700',
  },
  price: {
    color: '#1565C0',
    fontWeight: '800',
    marginTop: 6,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  chip: {
    backgroundColor: '#E3F2FD',
  },
  chipText: {
    color: '#1565C0',
    fontSize: 13,
  },
  chipRating: {
    backgroundColor: '#FFF8E1',
  },
  chipRatingText: {
    color: '#F9A825',
    fontSize: 13,
  },
  description: {
    color: '#546E7A',
    lineHeight: 26,
    marginBottom: 8,
  },
  favoriteButton: {
    marginTop: 20,
    borderRadius: 12,
    borderColor: '#1565C0',
    borderWidth: 2,
  },
  favoriteContent: {
    paddingVertical: 6,
  },
});

export default DetailScreen;
