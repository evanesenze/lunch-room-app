import React, { useEffect } from "react";
import Navigation from "./Navigation.component";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home.screen";
import Orders from "../screens/Orders.screen";
import Cart from "../screens/Cart.screen";
import Profile from "../screens/Profile.screen";
import { useAppActions, useAppSelector } from "../hooks/useApp";
import { useAuthMutation } from "../store/apis/auth.api";
import { useLazyGetUserQuery } from "../store/apis/user.api";
import jwt from "jwt-decode";
import { Alert } from "react-native";

export type AppParamsList = {
  Home: undefined;
  Orders: undefined;
  Cart: undefined;
  Profile: undefined;
};

export type ViewType = keyof AppParamsList;

const Tab = createBottomTabNavigator<AppParamsList>();

const Layout: React.FC = () => {
  const { updateUser } = useAppActions();
  const [auth] = useAuthMutation();
  const [getUser] = useLazyGetUserQuery();
  const { token } = useAppSelector((store) => store.user);

  const login = async () => {
    // const token =
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiJhMTFjM2I5NC0xYTBlLTQ4YWEtODNhMC04ZDMwNWU5ZDkyYTUiLCJlbWFpbCI6ImFkbWluQGFkbWluLnJ1Iiwicm9sZSI6IkFkbWluIiwibmJmIjoxNjczMzY2MTA4LCJleHAiOjE2NzYwNDQ1MDgsImlhdCI6MTY3MzM2NjEwOCwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NTEyOSIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjUxMjkifQ.xKl3cznbSvuxbxAdCb9sT160VDa4qvv6k6cHqnmG-SM";
    // const token =
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiI0NzBmM2VhYS02NzI2LTQ5NTEtYTc1Zi1lMWIzZmJhMDFiZDUiLCJlbWFpbCI6InVzZXJAdXNlci5ydSIsInJvbGUiOiJVc2VyIiwibmJmIjoxNjczMjc3NTUxLCJleHAiOjE2NzU5NTU5NTEsImlhdCI6MTY3MzI3NzU1MSwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NTEyOSIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjUxMjkifQ.56vksmmLWnmbOKwr1m9GXHG8Qpz3tvg6s3WWWVHUWfc";
    if (!token || token.split(".").length < 3) return;
    const userId = jwt<{ UserID: string }>(token).UserID;
    const userInfo = await getUser({ userId, token })
      .unwrap()
      .catch(console.error);
    // Alert.alert(userInfo ? `Логин за ${userInfo.email}` : "Авторизуйтесь");
    updateUser({ info: userInfo ?? undefined, token });
  };

  useEffect(() => {
    login();
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{ headerShown: false, unmountOnBlur: true }}
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
