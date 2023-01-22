import { Icon } from '@rneui/base';
import React from 'react';
import { View, StyleSheet, Text, Image, Pressable } from 'react-native';
import { useAppActions } from '../hooks/useApp';
import { ICartItem } from '../store/slices/cart.slice';

interface ICartItemProps {
  item: ICartItem;
  index: number;
}

const CartItem: React.FC<ICartItemProps> = ({ index, item }) => {
  const { addToCart, removeFromCart, removeAllFromCart } = useAppActions();

  return (
    <View style={styles.wrapper}>
      <View style={styles.imageWrapper}>
        <Image style={styles.image} source={require('../../assets/CartItemImage.png')} />
      </View>
      <View style={styles.infoWrapper}>
        <Text style={styles.itemTitle}>Комбо набор #{index + 1}</Text>
        <View style={styles.controlsContainer}>
          <View style={styles.controlsWrapper}>
            <Pressable onPress={() => removeFromCart(item.item)}>
              <Text style={styles.cartControl}>-</Text>
            </Pressable>
            <Text style={styles.controlsCount}>{item.count}</Text>
            <Pressable onPress={() => addToCart(item.item)}>
              <Text style={styles.cartControl}>+</Text>
            </Pressable>
          </View>
        </View>
      </View>
      <View style={styles.priceWrapper}>
        <View style={styles.closeBtn}>
          <Icon name="close" onPress={() => removeAllFromCart(item.item.id)} />
        </View>
        <Text>{Number(item.item.price) * item.count} P</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: 100,
    padding: 10,
    borderColor: '#F5F5F5',
    borderWidth: 2,
    borderRadius: 25,
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '5%',
  },
  imageWrapper: { flex: 2, justifyContent: 'center', alignItems: 'center' },
  image: { width: '100%' },
  infoWrapper: { flex: 3, justifyContent: 'space-between' },
  itemTitle: { fontSize: 18 },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  controlsWrapper: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    padding: 5,
    borderRadius: 8,
  },
  controlsCount: {
    fontSize: 18,
    lineHeight: 18,
    paddingLeft: 15,
    paddingRight: 15,
  },
  priceWrapper: { flex: 1, justifyContent: 'space-between' },
  closeBtn: { alignItems: 'flex-end' },
  cartControl: {
    fontSize: 18,
    lineHeight: 18,
  },
});

export default CartItem;
