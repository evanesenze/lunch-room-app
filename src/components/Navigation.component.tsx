import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import {
  NavigationHelpers,
  TabNavigationState,
} from "@react-navigation/native";
import React from "react";
import { StyleSheet, View } from "react-native";

import CartIcon from "../icons/Cart.icon";
import HomeIcon from "../icons/Home.icon";
import OrdersIcon from "../icons/Orders.icon";
import ProfileIcon from "../icons/Profile.icon";
import { AppParamsList } from "./Layout.component";
import NavigationBtn, { INavigationBtnProps } from "./NavigationBtn.component";

const buttons: INavigationBtnProps[] = [
  { icon: <HomeIcon />, type: "Home" },
  { icon: <OrdersIcon />, type: "Orders" },
  { icon: <CartIcon />, type: "Cart" },
  { icon: <ProfileIcon />, type: "Profile" },
];

interface INavigationProps extends BottomTabBarProps {
  state: TabNavigationState<AppParamsList>;
  navigation: NavigationHelpers<AppParamsList>;
}

const Navigation: React.FC<INavigationProps> = ({ state, navigation }) => {
  return (
    <View style={styles.navigation}>
      {buttons.map((props, i) => (
        <NavigationBtn
          key={props.type}
          {...props}
          isCurrent={i === state.index}
          onClick={() => navigation.navigate(props.type)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  navigation: {
    backgroundColor: "#FF4F5A",
    // flex: 1,
    height: "10%",
    width: "100%",
    paddingLeft: "5%",
    paddingRight: "5%",
    flexDirection: "row",
  },
  navigationText: {
    color: "white",
    textAlign: "center",
    fontSize: 8,
  },
  navigationItem: {
    width: "20%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "transparent",
    marginRight: "2.5%",
    marginLeft: "2.5%",
  },
  selectedNavigationItem: {
    borderTopColor: "white",
  },
});

export default Navigation;
