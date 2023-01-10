import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button } from "@rneui/base";
import React from "react";
import { View, Text } from "react-native";
import Header from "../components/Header.component";
import { AppParamsList } from "../components/Layout.component";
import { useAppActions, useAppSelector } from "../hooks/useApp";

const Cart: React.FC<NativeStackScreenProps<AppParamsList, "Cart">> = () => {
  const { items } = useAppSelector((store) => store.cart);
  const { clearCart } = useAppActions();
  return (
    <View>
      <Header />
      <Button onPress={() => clearCart()}>Отчистить</Button>
      <Text>Count: {items.length}</Text>
      <Text>{JSON.stringify(items)}</Text>
    </View>
  );
};

export default Cart;
