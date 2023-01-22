import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Header from '../components/Header.component';
import { AppParamsList } from '../components/Layout.component';
import { useAppSelector } from '../hooks/useApp';
import { IOrder, useGetOrdersByUserQuery, useLazyGetOrderQuery } from '../store/apis/order.api';
import { Text } from '@rneui/base';
import OrderItem from '../components/OrderItem.components';
import Loading from '../components/Loading.component';

const Orders: React.FC<NativeStackScreenProps<AppParamsList, 'Orders'>> = ({ navigation }) => {
  const { info } = useAppSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrder] = useState<IOrder[]>([]);
  const [getOrder] = useLazyGetOrderQuery();

  const { data: ordersData, error } = useGetOrdersByUserQuery(
    {
      groupId: String(info?.groups[0]),
      userId: String(info?.id),
    },
    { skip: !info?.id || !info?.groups.length }
  );

  const loadOrder = async () => {
    if (!ordersData) return;
    setIsLoading(true);
    const res = await Promise.all(ordersData.map(({ id }) => getOrder({ orderId: id }).unwrap()));
    setOrder(res);
    setIsLoading(false);
  };

  useEffect(() => {
    loadOrder();
  }, [ordersData]);

  return (
    <View style={styles.container}>
      <Header containerStyle={styles.headerContainer} />
      {isLoading && <Loading />}
      {!!orders.length && (
        <ScrollView>
          <Text h3 style={styles.historyTitle}>
            История заказов
          </Text>
          {orders.map((props, i) => (
            <OrderItem key={i} {...props} onPayment={() => navigation.navigate('Cart', { orderId: props.id })} />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: '4%',
    paddingRight: '4%',
    position: 'relative',
    backgroundColor: 'white',
  },
  headerContainer: { marginBottom: 10 },
  historyTitle: { marginBottom: 10 },
});

export default Orders;
