import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View } from "react-native";
import Header from "../components/Header.component";
import { AppParamsList } from "../components/Layout.component";

const Profile: React.FC<
  NativeStackScreenProps<AppParamsList, "Profile">
> = () => {
  return (
    <View>
      <Header />
    </View>
  );
};

export default Profile;
