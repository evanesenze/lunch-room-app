import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

import { IOrder } from '../store/apis/order.api';

interface IOrderItemProps {
  onPayment(): void;
}

const OrderItem: React.FC<IOrder & IOrderItemProps> = ({ lunchSet, orderDate, payment, onPayment }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image style={styles.image} source={require('../../assets/CartItemImage.png')} />
      </View>
      <View style={styles.infoWrapper}>
        <Text style={styles.itemTitle}>Комбо набор</Text>
        <Text style={styles.description}>{lunchSet.lunchSetList.join('\n')}</Text>
        <View style={styles.controlsWrapper}>
          <Text style={styles.orderDate}>{new Date(orderDate).toLocaleDateString()}</Text>
          <Text onPress={payment ? undefined : onPayment} style={styles.payment}>
            {payment ? `${lunchSet.price} P` : 'Оплатить'}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 10,
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '5%',
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  imageWrapper: { flex: 1, justifyContent: 'flex-start', alignItems: 'center' },
  image: { width: '100%' },
  infoWrapper: {
    flex: 3,
    paddingLeft: 5,
    paddingRight: 5,
  },
  itemTitle: { fontSize: 18 },
  description: {
    fontSize: 10,
    lineHeight: 10,
    color: 'grey',
    paddingTop: '3%',
    marginBottom: '3%',
  },
  controlsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  orderDate: {
    fontSize: 10,
    lineHeight: 10,
    color: 'grey',
  },
  payment: { fontSize: 16, lineHeight: 16 },
});

export default OrderItem;
