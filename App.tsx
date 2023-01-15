import { StatusBar } from "expo-status-bar";
import React from "react";
import { View } from "react-native";
import Layout from "./src/components/Layout.component";
import { Provider } from "react-redux";
import { store } from "./src/store";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <StatusBar style="auto" />
        <Layout />
      </View>
    </Provider>
  );
};

export default App;
