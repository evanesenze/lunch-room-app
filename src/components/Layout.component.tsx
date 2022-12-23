import React from "react";
import Navigation from "./Navigation.component";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../Screen/Home.screen";
import Orders from "../Screen/Orders.screen";
import Cart from "../Screen/Cart.screen";
import Profile from "../Screen/Profile.screen";

export type AppParamsList = {
  Home: undefined;
  Orders: undefined;
  Cart: undefined;
  Profile: undefined;
};

export type ViewType = keyof AppParamsList;

const Tab = createBottomTabNavigator<AppParamsList>();

const Layout: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{ headerShown: false }}
        tabBar={(props) => <Navigation {...(props as any)} />}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Orders" component={Orders} />
        <Tab.Screen name="Cart" component={Cart} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Layout;
