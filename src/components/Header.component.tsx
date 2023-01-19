import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Pressable,
  StatusBar,
  ViewStyle,
} from "react-native";
import BackIcon from "../icons/Back.icon";
import InfoIcon from "../icons/Info.icon";
import LunchRoomIcon from "../icons/LunchRoom.icon";
import Support from "./Support.component";
import { getStatusBarHeight } from "react-native-status-bar-height";

interface IHeaderProps {
  onBack?(): void;
  hideInfo?: boolean;
  containerStyle?: ViewStyle;
}

const Header: React.FC<IHeaderProps> = ({
  onBack,
  hideInfo,
  containerStyle,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  containerStyle;
  return (
    <View style={{ ...styles.header, ...containerStyle }}>
      <Support
        transparent
        visible={modalVisible}
        animationType="fade"
        onClose={() => setModalVisible(false)}
      />
      <View style={styles.btn}>
        {!!onBack && (
          <Pressable onPress={onBack}>
            <BackIcon />
          </Pressable>
        )}
      </View>
      <View style={styles.icon}>
        <LunchRoomIcon />
      </View>
      <View style={styles.info}>
        {!hideInfo && (
          <Pressable onPress={() => setModalVisible(true)}>
            <InfoIcon />
          </Pressable>
        )}
      </View>
    </View>
  );
};

const paddingTop = (StatusBar.currentHeight ?? getStatusBarHeight(true)) + 10;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(1,1,1,0.6)",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    paddingLeft: "5%",
    paddingRight: "5%",
    paddingTop,
    paddingBottom: "1%",
  },
  btn: {
    width: "20%",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  icon: { width: "60%", justifyContent: "center", alignItems: "center" },
  info: { width: "20%", justifyContent: "center", alignItems: "flex-end" },
});

export default Header;
