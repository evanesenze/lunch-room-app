import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View } from "react-native";
import Header from "../components/Header.component";
import { AppParamsList } from "../components/Layout.component";

const Cart: React.FC<NativeStackScreenProps<AppParamsList, "Cart">> = () => {
  return (
    <View>
      <Header />
    </View>
  );
};

export default Cart;
