import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Text, Image } from '@rneui/base';
import React, { useState } from 'react';
import { Alert, ScrollView, View, StyleSheet, Linking } from 'react-native';
import CartItem from '../components/CartItem.component';
import Header from '../components/Header.component';
import { AppParamsList } from '../components/Layout.component';
import { useAppActions, useAppSelector } from '../hooks/useApp';
import { useGetTodayMenuQuery } from '../store/apis/menu.api';
import { IOrder, useConfirmPaymentMutation, useCreateOrderMutation, useGetOrderQuery } from '../store/apis/order.api';
import QRCode from 'react-native-qrcode-svg';

const Cart: React.FC<NativeStackScreenProps<AppParamsList, 'Cart'>> = ({ navigation, route: { params } }) => {
  const { items } = useAppSelector((store) => store.cart);
  const { info } = useAppSelector((store) => store.user);
  const { activeGroup } = useAppSelector((store) => store.group);
  const { clearCart } = useAppActions();
  const [createOrder, { isLoading: isOrderLoading }] = useCreateOrderMutation();
  const [confirmPayment, { isLoading: isPaymentLoading }] = useConfirmPaymentMutation();
  const [isPayment, setIsPayment] = useState(!!params?.orderId);
  const { data: menu } = useGetTodayMenuQuery(
    {
      groupId: String(activeGroup?.id),
    },
    { skip: !activeGroup }
  );
  const { data: existOrder } = useGetOrderQuery({ orderId: String(params?.orderId) }, { skip: !params?.orderId });
  const [currentOrder, setCurrentOrder] = useState<IOrder | undefined>(existOrder);

  const totalCost = isPayment ? currentOrder?.lunchSet.price : items.reduce((acc, { count, item }) => acc + count * item.price, 0);

  const confirm = () => {
    if (!currentOrder) return;
    confirmPayment({ orderId: currentOrder.id })
      .unwrap()
      .then(() => {
        Alert.alert('Успех', 'Заказ успешно оплачен');
        clearCart();
        setIsPayment(false);
        navigation.navigate('Orders');
      })
      .catch(console.error);
  };

  const create = async () => {
    if (!items.length || currentOrder || !info || !menu || !activeGroup) return;
    await createOrder({
      customerId: info.id,
      groupId: activeGroup.id,
      lunchSetId: items[0].item.id,
      menuId: menu.id,
      lunchSetUnits: items[0].count,
      options: [],
    })
      .unwrap()
      .then((res) => {
        setIsPayment(true);
        setCurrentOrder(res);
        clearCart();
      })
      .catch(() => Alert.alert('Ошибка при создании заказа'));
  };

  const onBack = () => {
    setIsPayment(false);
    setCurrentOrder(undefined);
  };

  return (
    <View style={styles.container}>
      <Header onBack={isPayment ? onBack : undefined} containerStyle={styles.headerContainer} />
      <ScrollView bounces={!isPayment && !!items.length}>
        <Text h3 style={styles.pageTitle}>
          {isPayment ? 'Оплата' : 'Корзина'}
        </Text>
        {!isPayment && !items.length && (
          <View style={styles.emptyCart}>
            <Text style={styles.emptyCartTitle}>Ваша корзина пуста!</Text>
            <Image style={styles.emptyCartImage} source={require('../../assets/EmptyCart.png')} />
          </View>
        )}
        {isPayment ? (
          <>
            <Text style={{ fontSize: 16 }}>Пожалуйста, отсканируйте QR-код для оплаты заказа</Text>
            <View style={{ alignItems: 'center', marginBottom: 20, marginTop: 40 }}>
              <QRCode value={activeGroup?.paymentInfo?.link} size={200} />
            </View>
            <Text
              onPress={() => Linking.openURL(activeGroup?.paymentInfo?.link ?? '')}
              style={{ textDecorationLine: 'underline', textAlign: 'center' }}
            >
              Ссылка для перевода денег на карту
            </Text>
          </>
        ) : (
          items.map((item, i) => <CartItem key={i} index={i} item={item} />)
        )}
      </ScrollView>
      {(isPayment || !!items.length) && (
        <View style={styles.cartInfo}>
          <View style={styles.totalCost}>
            <Text h4>Общая стоимость</Text>
            <Text h4>{totalCost} P</Text>
          </View>
          <Button
            color="#FF4F5A"
            onPress={isPayment ? confirm : create}
            loading={isOrderLoading || isPaymentLoading}
            disabled={isOrderLoading || isPaymentLoading}
          >
            {isPayment ? 'Подтвердить заказ' : 'Перейти к оплате'}
          </Button>
        </View>
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
  pageTitle: { marginBottom: 10 },
  cartInfo: {
    bottom: 0,
    position: 'absolute',
    width: '100%',
    paddingBottom: 20,
    marginLeft: '4%',
    backgroundColor: 'white',
  },
  totalCost: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  headerContainer: { marginBottom: 10 },
  emptyCart: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyCartTitle: { marginTop: '5%' },
  emptyCartImage: { width: 414, height: 414 },
});

export default Cart;
