import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View } from "react-native";
import Header from "../components/Header.component";
import { AppParamsList } from "../components/Layout.component";

const Orders: React.FC<
  NativeStackScreenProps<AppParamsList, "Orders">
> = () => {
  return (
    <View>
      <Header />
    </View>
  );
};

export default Orders;
