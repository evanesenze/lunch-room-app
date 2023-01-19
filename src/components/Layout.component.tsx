import React from "react";
import Navigation from "./Navigation.component";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home.screen";
import Orders from "../screens/Orders.screen";
import Cart from "../screens/Cart.screen";
import Profile from "../screens/Profile.screen";
import Auth from "../screens/Auth.screen";

export type AppParamsList = {
  Home: undefined;
  Orders: undefined;
  Cart: { orderId?: string } | undefined;
  Profile: undefined;
  Auth: undefined;
};

export type ViewType = keyof AppParamsList;

const Tab = createBottomTabNavigator<AppParamsList>();

const Layout: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{ headerShown: false, unmountOnBlur: true }}
        tabBar={(props) => <Navigation {...(props as any)} />}
      >
        <Tab.Screen name="Auth" component={Auth} />
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Orders" component={Orders} />
        <Tab.Screen name="Cart" component={Cart} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Layout;
