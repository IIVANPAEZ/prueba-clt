import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, Text} from 'react-native-paper';
import {Product} from '../types/Product';

interface Props {
  product: Product;
  onPress: () => void;
}

const ProductCard: React.FC<Props> = ({product, onPress}) => {
  return (
    <Card style={styles.card} onPress={onPress} mode="elevated">
      <View style={styles.row}>
        <Card.Cover source={{uri: product.thumbnail}} style={styles.image} />
        <View style={styles.info}>
          <Text variant="titleMedium" numberOfLines={2} style={styles.title}>
            {product.title}
          </Text>
          <Text variant="titleLarge" style={styles.price}>
            ${product.price.toFixed(2)}
          </Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 6,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    padding: 12,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 12,
    backgroundColor: '#E3F2FD',
  },
  info: {
    flex: 1,
    marginLeft: 14,
    justifyContent: 'center',
  },
  title: {
    color: '#1A1A2E',
    fontWeight: '600',
  },
  price: {
    color: '#1565C0',
    fontWeight: '700',
    marginTop: 6,
  },
});

export default React.memo(ProductCard);
