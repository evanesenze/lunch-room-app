import { StatusBar } from "expo-status-bar";
import React from "react";
import { View } from "react-native";
import Layout from "./src/components/Layout.component";
import { Provider } from "react-redux";
import { persistor, store } from "./src/store";
import { PersistGate } from "reduxjs-toolkit-persist/integration/react";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <View style={{ flex: 1 }}>
          <StatusBar style="auto" />
          <Layout />
        </View>
      </PersistGate>
    </Provider>
  );
};

export default App;
