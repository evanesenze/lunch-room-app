import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, SafeAreaView, View, Text } from "react-native";
import Layout from "./src/components/Layout.component";

const App: React.FC = () => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <Layout></Layout>
    </View>
  );
};

export default App;
