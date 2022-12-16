import React, { useState, useCallback } from "react";
import { StyleSheet, View } from "react-native";

import CartIcon from "../icons/Cart.icon";
import HomeIcon from "../icons/Home.icon";
import OrdersIcon from "../icons/Orders.icon";
import ProfileIcon from "../icons/Profile.icon";
import NavigationBtn, { INavigationBtnProps } from "./NavigationBtn.component";

export type ViewType = "Home" | "Orders" | "Cart" | "Profile";

const buttons: INavigationBtnProps[] = [
  { icon: <HomeIcon />, type: "Home" },
  { icon: <OrdersIcon />, type: "Orders" },
  { icon: <CartIcon />, type: "Cart" },
  { icon: <ProfileIcon />, type: "Profile" },
];

const Navigation: React.FC = () => {
  const [currentView, setView] = useState<ViewType>("Home");

  const switchView = useCallback((type: ViewType) => setView(type), []);

  return (
    <View style={styles.navigation}>
      {buttons.map((props) => (
        <NavigationBtn
          key={props.type}
          {...props}
          isCurrent={props.type === currentView}
          onClick={switchView}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  navigation: {
    backgroundColor: "#FF4F5A",
    flex: 1,
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
