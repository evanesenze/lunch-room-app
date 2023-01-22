import React from 'react';
import { View, StyleSheet, Text, Image, Pressable } from 'react-native';
import { useAppActions, useAppSelector } from '../hooks/useApp';
import CartIcon from '../icons/Cart.icon';
import { IMenuLunchSet } from '../store/apis/menu.api';

interface IMenuItemProps {
  item: IMenuLunchSet;
  index: number;
}

const MenuItem: React.FC<IMenuItemProps> = ({ index, item }) => {
  const { items } = useAppSelector((store) => store.cart);
  const { addToCart, removeFromCart } = useAppActions();

  const currentCount = items.find(({ item: { id } }) => id === item.id)?.count ?? 0;

  return (
    <View style={styles.menuItem}>
      <Image style={styles.image} source={require('../../assets/MenuItemImage.png')} />
      <Text style={styles.itemTitle}>Комбо #{index + 1}</Text>
      <Text style={styles.itemInfo}>{item.lunchSetList.join('\n')}</Text>
      <View style={styles.controls}>
        <Text style={styles.price}>{currentCount ? currentCount * item.price : item.price} Р</Text>
        <View style={styles.cartButton}>
          {!currentCount ? (
            <Pressable onPress={() => addToCart(item)}>
              <CartIcon size={20} />
            </Pressable>
          ) : (
            <View style={styles.controlsWrapper}>
              <Pressable onPress={() => removeFromCart(item)}>
                <Text style={styles.cartControl}>-</Text>
              </Pressable>
              <Text style={styles.currentCount}>{currentCount}</Text>
              <Pressable onPress={() => addToCart(item)}>
                <Text style={styles.cartControl}>+</Text>
              </Pressable>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    position: 'relative',
    flex: 1,
    borderRadius: 10,
    paddingBottom: 0,
    margin: '1%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#F5F5F5',
  },
  image: { width: '100%', height: 122 },
  cartButton: {
    height: 30,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
    paddingTop: 5,
    borderRadius: 10,
    backgroundColor: '#FF4F5A',
  },
  price: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '600',
    marginRight: '2%',
  },
  cartControl: {
    color: 'white',
    fontSize: 18,
    lineHeight: 18,
  },
  itemTitle: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 14,
    height: 18,
    // backgroundColor: "yellow",
    padding: '3%',
    marginTop: '3%',
  },
  itemInfo: {
    fontSize: 10,
    lineHeight: 10,
    color: 'grey',
    padding: '3%',
    marginBottom: 'auto',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 30,
  },
  controlsWrapper: { flex: 1, flexDirection: 'row' },
  currentCount: {
    color: 'white',
    fontSize: 18,
    lineHeight: 18,
    paddingLeft: 15,
    paddingRight: 15,
  },
});

export default MenuItem;
