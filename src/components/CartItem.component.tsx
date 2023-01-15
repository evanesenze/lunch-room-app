import { Icon } from "@rneui/base";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image, Pressable } from "react-native";
import { useAppActions, useAppSelector } from "../hooks/useApp";
import CartIcon from "../icons/Cart.icon";
import {
  IMenuLunchSet,
  useLazyGetTodayMenuQuery,
} from "../store/apis/menu.api";
import { ICartItem } from "../store/slices/cart.slice";

interface ICartItemProps {
  item: ICartItem;
  index: number;
}

const CartItem: React.FC<ICartItemProps> = ({ index, item }) => {
  const { addToCart, removeFromCart, removeAllFromCart } = useAppActions();

  return (
    <View
      style={{
        width: "100%",
        height: 100,
        padding: 10,
        borderColor: "gray",
        borderWidth: 2,
        borderRadius: 25,
        justifyContent: "center",
        display: "flex",
        flexDirection: "row",
        marginBottom: "5%",
      }}
    >
      <View style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
        <Image
          style={{ width: "100%" }}
          source={require("../../assets/CartItemImage.png")}
        />
      </View>
      <View style={{ flex: 3, justifyContent: "space-between" }}>
        <Text style={{ fontSize: 18 }}>Комбо набор #{index + 1}</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "gray",
              padding: 5,
              borderRadius: 8,
            }}
          >
            <Pressable onPress={() => removeFromCart(item.item)}>
              <Text style={styles.cartControl}>-</Text>
            </Pressable>
            <Text
              style={{
                ...styles.cartControl,
                paddingLeft: 15,
                paddingRight: 15,
              }}
            >
              {item.count}
            </Text>
            <Pressable onPress={() => addToCart(item.item)}>
              <Text style={styles.cartControl}>+</Text>
            </Pressable>
          </View>
        </View>
      </View>
      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <View style={{ alignItems: "flex-end" }}>
          <Icon name="close" onPress={() => removeAllFromCart(item.item.id)} />
        </View>
        <Text>{Number(item.item.price) * item.count} P</Text>
      </View>
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

export default CartItem;
