import React, { memo, useMemo } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import styles from './cart.styles';
import { Ionicons } from '@expo/vector-icons';
import { newCart } from '../../screens/hook/useCarts.facade';

interface CartCardProps {
  cart: newCart;
  selected: boolean;
  onPress: () => void;
  onAddFavorite: () => void;
}

const getRandomSus = () => {
  const titles = ['SAS', 'SES', 'SIS', 'SOS', 'SUS'];
  const randomIndex = Math.floor(Math.random() * titles.length);
  return titles[randomIndex];
};

const Card = ({ cart, selected, onAddFavorite, onPress }: CartCardProps) => {
  const randomSus = useMemo(() => getRandomSus(), []);
  return (
    <>
      <View style={styles.container}>
        <View style={styles.containerHeader}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleStyle}>USER CART: {randomSus}</Text>
          </View>
          <Ionicons
            onPress={onAddFavorite}
            name={selected ? 'heart-sharp' : 'heart-outline'}
            size={28}
            color={'#ffd700'}
          />
        </View>
        <View style={styles.containerImage}>
          <Image
            source={{
              uri: 'https://www.pngall.com/wp-content/uploads/5/Empty-Red-Shopping-Cart-PNG-Picture.png',
            }}
            style={styles.imageStyle}
          />
        </View>
        <Text style={styles.genericCardText}>Cart products: {cart.totalProducts}</Text>
        <Text style={[styles.genericCardText, styles.genericCardTextSpacing]}>
          Total cost: {cart.totalCost} $
        </Text>
      </View>

      <TouchableOpacity style={styles.buyCartButton} onPress={onPress}>
        <Text style={styles.genericCardText}>BUY CART {cart.offers} $</Text>
      </TouchableOpacity>
    </>
  );
};

export default memo(Card);
