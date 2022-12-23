import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import React from "react";
import { View } from "react-native";
import Header from "../components/Header.component";
import { AppParamsList } from "../components/Layout.component";

// const Stack = createNativeStackNavigator<AppParamsList>();

const Home: React.FC<NativeStackScreenProps<AppParamsList, "Home">> = () => {
  return (
    <View>
      <Header />
    </View>
  );
};

export default Home;
