import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import CartIcon from "../icons/Cart.icon";

interface IMenuItemProps {}

const MenuItem: React.FC<IMenuItemProps> = () => {
  return (
    <View style={styles.menuItem}>
      <Image
        style={{ width: "100%", height: 122 }}
        source={require("../../assets/MenuItemImage.png")}
      />
      <Text
        style={{
          fontWeight: "600",
          fontSize: 14,
          lineHeight: 14,
          height: 18,
          // backgroundColor: "yellow",
          padding: "3%",
          marginTop: "3%",
        }}
      >
        Комбо #1
      </Text>
      <Text
        ellipsizeMode="middle"
        numberOfLines={2}
        style={{
          height: 18,
          fontSize: 10,
          lineHeight: 10,
          color: "grey",
          // backgroundColor: "red",
          padding: "3%",
        }}
      >
        600 г
      </Text>
      <View
        style={{
          // flex: 1,
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
          height: 30,
          // backgroundColor: "green",
        }}
      >
        <Text style={styles.price}>24 011 Р</Text>
        <View style={styles.cartButton}>
          <CartIcon size={20} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    position: "relative",
    flex: 1,
    // justifyContent: "space-between",
    // height: 200,
    borderRadius: 10,
    // padding: "3%",
    paddingBottom: 0,
    margin: "1%",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#F5F5F5",
  },
  cartButton: {
    // position: "absolute",
    // bottom: -2,
    // right: -5,
    width: 40,
    height: 30,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
    paddingTop: 5,
    borderRadius: 10,
    backgroundColor: "#FF4F5A",
  },
  price: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "600",
    marginRight: "2%",
  },
});

export default MenuItem;
