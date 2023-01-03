import React, { useRef } from "react";
import {
  StyleSheet,
  Modal,
  Pressable,
  Text,
  ModalProps,
  View,
  TextInput,
} from "react-native";
import { Input, Button } from "@rneui/base";

interface ISupportProps extends ModalProps {
  onClose?(): void;
}

const Support: React.FC<ISupportProps> = ({ onClose, ...props }) => {
  const reasonRef = React.createRef<Input & TextInput>();
  const messageRef = useRef<Input>();

  const handleSubmit = () => {
    reasonRef.current?.shake();

    // console.log(reasonRef.current?.input);
  };

  return (
    <Modal {...props}>
      <View style={styles.modal}>
        <View
          onTouchStart={onClose}
          style={{
            position: "absolute",
            backgroundColor: "rgba(0,0,0,0.6)",
            height: "100%",
            width: "100%",
          }}
        />
        <View style={styles.content}>
          <Text style={{ textAlign: "center", fontSize: 18 }}>
            Написать в поддержку
          </Text>
          <Text>Причина</Text>
          <Input ref={reasonRef} placeholder="Укажите причину обращения" />
          <Text>Сообщение</Text>
          <Input placeholder="Опишите ситуацию" />
          <Button onPress={handleSubmit}>Отправить</Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  content: {
    width: "90%",
    height: "50%",
    backgroundColor: "white",
    padding: 20,
    justifyContent: "space-around",
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
});

export default Support;
