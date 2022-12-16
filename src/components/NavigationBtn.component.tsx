import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ViewType } from "./Navigation.component";

export interface INavigationBtnProps {
  type: ViewType;
  icon: JSX.Element;
  isCurrent?: boolean;
  onClick?(type: ViewType): void;
}

const buttonsName: Record<ViewType, string> = {
  Cart: "Cart",
  Home: "Home",
  Orders: "Orders",
  Profile: "Profile",
};

const NavigationBtn: React.FC<INavigationBtnProps> = ({
  icon,
  type,
  isCurrent,
  onClick,
}) => {
  return (
    <View
      style={{
        ...styles.navigationItem,
        ...(isCurrent ? styles.selectedNavigationItem : undefined),
      }}
      onTouchStart={() => onClick?.(type)}
    >
      {icon}
      {isCurrent && (
        <Text style={styles.navigationText}>{buttonsName[type]}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  navigationText: {
    color: "white",
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
    transition: 1,
  },
  selectedNavigationItem: {
    borderTopColor: "white",
  },
});

export default NavigationBtn;
