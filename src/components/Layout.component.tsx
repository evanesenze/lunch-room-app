import React from "react";
import { StyleSheet, View } from "react-native";
import Header from "./Header.component";
import Navigation from "./Navigation.component";

interface ILayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<ILayoutProps> = ({ children }) => {
  console.log(children);
  return (
    <View style={{ flex: 1 }}>
      <Header onBack={() => console.log(1)} />
      <View style={styles.content}>{children}</View>
      <Navigation />
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: "green",
    flex: 8,
    width: "100%",
  },
});

export default Layout;
