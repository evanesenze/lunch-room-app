import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { SearchBar } from "@rneui/themed";
import React, { useState } from "react";
import { View, ScrollView, FlatList } from "react-native";
import { Text } from "react-native-svg";
import Header from "../components/Header.component";
import { AppParamsList } from "../components/Layout.component";
import MenuItem from "../components/MenuItem.component";
import { useAppSelector } from "../hooks/useApp";

// const Stack = createNativeStackNavigator<AppParamsList>();

interface IMenuItem {
  id: string;
  title: string;
  cost: number;
}

const items: IMenuItem[] = [
  { id: "1", title: "Комбо 1", cost: 100 },
  { id: "2", title: "Комбо 2", cost: 100 },
  { id: "3", title: "Комбо 3", cost: 100 },
  { id: "4", title: "Комбо 4", cost: 100 },
  { id: "5", title: "Комбо 5", cost: 100 },
];

const Home: React.FC<NativeStackScreenProps<AppParamsList, "Home">> = () => {
  const [searchValue, setSearchValue] = useState("");
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Header />
      <View style={{ flex: 1, marginLeft: "2%", marginRight: "2%" }}>
        <SearchBar
          value={searchValue}
          onChangeText={setSearchValue}
          lightTheme
          round
          containerStyle={{
            backgroundColor: "transparent",
            padding: "1%",
            borderBottomColor: "transparent",
            borderTopColor: "transparent",
          }}
          inputContainerStyle={{
            backgroundColor: "white",
            borderBottomColor: "#F5F5F5",
            borderTopColor: "#F5F5F5",
            borderRightColor: "#F5F5F5",
            borderLeftColor: "#F5F5F5",
            borderWidth: 1,
            borderBottomWidth: 1,
          }}
        />
        <FlatList
          data={["", "", "", "", "", "", "", ""]}
          renderItem={MenuItem}
          numColumns={2}
        ></FlatList>
      </View>
    </View>
  );
};

export default Home;
