import { Icon } from "@rneui/base";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image, Pressable } from "react-native";
import { useAppActions, useAppSelector } from "../hooks/useApp";
import CartIcon from "../icons/Cart.icon";
import {
  IMenuLunchSet,
  useLazyGetTodayMenuQuery,
} from "../store/apis/menu.api";
import { IOrder } from "../store/apis/order.api";

interface IOrderItemProps {
  onPayment(): void;
}

const OrderItem: React.FC<IOrder & IOrderItemProps> = ({
  lunchSet,
  orderDate,
  payment,
  onPayment,
}) => {
  return (
    <View
      style={{
        width: "100%",
        padding: 10,
        justifyContent: "center",
        display: "flex",
        flexDirection: "row",
        marginBottom: "5%",
        borderBottomWidth: 1,
        borderBottomColor: "space-gray",
      }}
    >
      <View
        style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}
      >
        <Image
          style={{ width: "100%" }}
          source={require("../../assets/CartItemImage.png")}
        />
      </View>
      <View
        style={{
          flex: 3,
          paddingLeft: 5,
          paddingRight: 5,
          // backgroundColor: "green",
        }}
      >
        <Text style={{ fontSize: 18 }}>Комбо набор</Text>
        <Text
          style={{
            fontSize: 10,
            lineHeight: 10,
            color: "grey",
            paddingTop: "3%",
            marginBottom: "3%",
          }}
        >
          {lunchSet.lunchSetList.join("\n")}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontSize: 10,
              lineHeight: 10,
              color: "grey",
            }}
          >
            {new Date(orderDate).toLocaleDateString()}
          </Text>
          <Text
            onPress={payment ? undefined : onPayment}
            style={{ fontSize: 16, lineHeight: 16 }}
          >
            {payment ? `${lunchSet.price} P` : "Оплатить"}
          </Text>
        </View>
      </View>
      {/* <View style={{ flex: 2, justifyContent: "flex-end" }}>
        <Text>{payment ? `${lunchSet.price} P` : "Оплатить"}</Text>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  cartControl: {
    color: "white",
    fontSize: 18,
    lineHeight: 18,
  },
});

export default OrderItem;
