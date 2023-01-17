import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, Text } from "@rneui/base";
import React, { useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import CartItem from "../components/CartItem.component";
import Header from "../components/Header.component";
import { AppParamsList } from "../components/Layout.component";
import { useAppActions, useAppSelector } from "../hooks/useApp";
import { IMenuLunchSet, useGetTodayMenuQuery } from "../store/apis/menu.api";
import {
  IOrder,
  useConfirmPaymentMutation,
  useCreateOrderMutation,
} from "../store/apis/order.api";

const Cart: React.FC<NativeStackScreenProps<AppParamsList, "Cart">> = ({
  navigation,
}) => {
  const { items } = useAppSelector((store) => store.cart);
  const { info } = useAppSelector((store) => store.user);
  const { clearCart } = useAppActions();
  const [createOrder, { isLoading: isOrderLoading }] = useCreateOrderMutation();
  const [confirmPayment, { isLoading: isPaymentLoading }] =
    useConfirmPaymentMutation();
  const [isPayment, setIsPayment] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<IOrder>();
  const { data: menu } = useGetTodayMenuQuery({
    groupId: String(info?.groups[0]),
  });
  const totalCost = items.reduce(
    (acc, { count, item }) => acc + count * item.price,
    0
  );

  const confirm = () => {
    if (!currentOrder) return;
    confirmPayment({ orderId: currentOrder.id })
      .unwrap()
      .then(() => {
        Alert.alert("Успех", "Заказ успешно оплачен");
        clearCart();
        setIsPayment(false);
        navigation.navigate("Orders");
      })
      .catch(console.error);
  };

  const create = async () => {
    if (!currentOrder && info && menu) {
      const res = await createOrder({
        customerId: info.id,
        groupId: info.groups[0],
        lunchSetId: items[0].item.id,
        menuId: menu.id,
        options: [],
      })
        .unwrap()
        .catch(console.error);
      setCurrentOrder(res ?? undefined);
    }
    setIsPayment(true);
  };

  return (
    <View
      style={{
        flex: 1,
        paddingLeft: "4%",
        paddingRight: "4%",
        position: "relative",
        backgroundColor: "white",
      }}
    >
      <Header onBack={isPayment ? () => setIsPayment(false) : undefined} />
      {isPayment ? (
        <View>
          <Text h3 style={{ marginBottom: 10 }}>
            Оплата
          </Text>
          <Text>Пожалуйста, отсканируйте QR-код для оплаты заказа</Text>
        </View>
      ) : (
        <ScrollView>
          <Text h3 style={{ marginBottom: 10 }}>
            Корзина
          </Text>
          {items.map((item, i) => (
            <CartItem key={i} index={i} item={item} />
          ))}
        </ScrollView>
      )}
      <View
        style={{
          bottom: 0,
          position: "absolute",
          width: "100%",
          paddingBottom: 20,
          marginLeft: "4%",
          backgroundColor: "white",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          <Text h4>Общая стоимость</Text>
          <Text h4>{totalCost} P</Text>
        </View>
        <Button
          color="#FF4F5A"
          onPress={isPayment ? confirm : create}
          loading={isOrderLoading || isPaymentLoading}
          disabled={isOrderLoading || isPaymentLoading}
        >
          {isPayment ? "Подтвердить заказ" : "Перейти к оплате"}
        </Button>
      </View>
    </View>
  );
};

export default Cart;
