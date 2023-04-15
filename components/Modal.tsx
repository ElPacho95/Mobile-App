import React, { Dispatch, SetStateAction } from "react";
import {
  Modal as BaseModal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SettingsState } from "../types/types";

interface Props {
  state: SettingsState;
  setState: Dispatch<SetStateAction<SettingsState>>;
}

export const Modal: React.FC<Props> = ({ state, setState }) => {
  const onChange = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ): void => {
    if (selectedDate) {
      setState({ ...state, from: selectedDate });
    }
  };

  const onChange2 = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ): void => {
    if (selectedDate) {
      setState({ ...state, to: selectedDate });
    }
  };

  const handleMinAgeChange = (text: string) => {
    const regex = /^\d{0,2}$/;
    if (regex.test(text)) {
      setState({ ...state, minAge: text });
    }
  };

  const handleMaxAgeChange = (text: string) => {
    const regex = /^\d{0,2}$/;
    if (regex.test(text)) {
      setState({ ...state, maxAge: text });
    }
  };

  if (!state.modal) {
    return null;
  }

  const handleSave = () => {
    setState({ ...state, modal: null });
  };

  return (
    <View style={styles.centeredView}>
      <BaseModal
        animationType="slide"
        transparent={true}
        visible={!!state.modal}
        onRequestClose={() => {
          setState({ ...state, modal: null });
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              {state.modal === "age"
                ? "Выбор параметров возраста"
                : state.modal === "gender"
                ? "Выбор параметров пола аудитории"
                : state.modal === "date"
                ? "Выбор параметров периода"
                : null}
            </Text>
            {state.modal === "date" ? (
              <View style={[styles.displayFlex, { marginTop: 23 }]}>
                <DateTimePicker
                  value={state.from}
                  onChange={onChange}
                  testID="dateTimePicker"
                  mode="date"
                  display="default"
                />
                <Text>{"   :"}</Text>
                <DateTimePicker
                  value={state.to}
                  onChange={onChange2}
                  testID="dateTimePicker"
                  mode="date"
                  display="default"
                />
              </View>
            ) : state.modal === "age" ? (
              <View style={[styles.displayFlex, { width: 290 }]}>
                <TextInput
                  onChangeText={handleMinAgeChange}
                  value={state.minAge}
                  keyboardType="numeric"
                  style={styles.numberInput}
                />
                <Text style={styles.marginTop}>-</Text>
                <TextInput
                  onChangeText={handleMaxAgeChange}
                  value={state.maxAge}
                  keyboardType="numeric"
                  style={styles.numberInput}
                />
              </View>
            ) : state.modal === "gender" ? (
              <View style={[styles.displayFlex, { width: 290 }]}>
                <TouchableOpacity
                  onPress={() => setState({ ...state, gender: "MALE" })}
                  style={
                    state.gender === "MALE"
                      ? { ...styles.genderBtn, backgroundColor: "#747487" }
                      : styles.genderBtn
                  }
                >
                  <Text
                    style={
                      state.gender === "MALE"
                        ? styles.textWhite
                        : styles.textBlack
                    }
                  >
                    Мужчины
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setState({ ...state, gender: "FEMALE" })}
                  style={
                    state.gender === "FEMALE"
                      ? { ...styles.genderBtn, backgroundColor: "#747487" }
                      : styles.genderBtn
                  }
                >
                  <Text
                    style={
                      state.gender === "FEMALE"
                        ? styles.textWhite
                        : styles.textBlack
                    }
                  >
                    Женщины
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null}
            <Pressable style={styles.button} onPress={handleSave}>
              <Text style={styles.textStyle}>Сохранить</Text>
            </Pressable>
          </View>
        </View>
      </BaseModal>
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
  displayFlex: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  numberInput: {
    width: 134,
    height: 48,
    backgroundColor: "#D8D8DD",
    borderRadius: 5,
    marginTop: 16,
    textAlign: "center",
  },
  marginTop: { marginTop: 15 },
  genderBtn: {
    width: 134,
    height: 48,
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor: "#D8D8DD",
    marginTop: 16,
  },
  textWhite: { color: "white", textAlign: "center" },
  textBlack: { color: "black", textAlign: "center" },
});

export default Modal;
