import React, { Dispatch, SetStateAction } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";

interface Props {
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  children: any;
  title: string;
  save: () => void;
}

export const ModalComponent: React.FC<Props> = ({
  children,
  title,
  modalVisible,
  setModalVisible,
  save,
}) => {
  if (!modalVisible) {
    return null;
  }

  const handleSave = () => {
    save();
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{title}</Text>
            <View>{children}</View>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={handleSave}
            >
              <Text style={styles.textStyle}>Сохранить</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 8,
    width: 367,
    height: 182,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    marginTop: 26,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#C9C9C9",
  },
  textStyle: {
    textAlign: "center",
  },
  modalText: {
    textAlign: "center",
    marginTop: 20,
  },
});

export default ModalComponent;
