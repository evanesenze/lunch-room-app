import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, Text } from "@rneui/base";
import React from "react";
import { View } from "react-native";
import Header from "../components/Header.component";
import { AppParamsList } from "../components/Layout.component";
import { useAppActions, useAppSelector } from "../hooks/useApp";
import { useUploadMenuMutation } from "../store/apis/menu.api";

const Profile: React.FC<NativeStackScreenProps<AppParamsList, "Profile">> = ({
  navigation,
}) => {
  const storageToken = useAsyncStorage("token");
  const { logout } = useAppActions();
  const { token } = useAppSelector((store) => store.user);
  const [uploadMenu, { data, error }] = useUploadMenuMutation();

  return (
    <View>
      <Header />
      <Text>Вы {!!token ? "Вошли" : "Не вошли"}</Text>
      <Button
        onPress={() => {
          storageToken.removeItem();
          logout();
          navigation.navigate("Auth");
        }}
      >
        Выйти
      </Button>
      {data || (error && <Text>{JSON.stringify(data || error)}</Text>)}
      <Button onPress={() => uploadMenu()}>uploadMenu</Button>
    </View>
  );
};

export default Profile;
