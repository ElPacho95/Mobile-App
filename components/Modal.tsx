import React from "react";
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
import { SetSettings, Settings } from "../types/types";

interface Props {
  state: Settings;
  setState: SetSettings;
}

export const Modal: React.FC<Props> = ({ state, setState }) => {
  const { openedType, maxAge, minAge, gender, from, to } = state;
  const { setOpenedType, setGender, setMinAge, setMaxAge, setTo, setFrom } =
    setState;

  const onChange = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ): void => {
    if (selectedDate) {
      setFrom(selectedDate);
    }
  };

  const onChange2 = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ): void => {
    if (selectedDate) {
      setTo(selectedDate);
    }
  };

  const handleMinAgeChange = (text: string) => {
    const regex = /^\d{0,2}$/;
    if (regex.test(text)) {
      setMinAge(text);
    }
  };

  const handleMaxAgeChange = (text: string) => {
    const regex = /^\d{0,2}$/;
    if (regex.test(text)) {
      setMaxAge(text);
    }
  };

  if (!openedType) {
    return null;
  }

  const handleSave = () => {
    setOpenedType(null);
  };

  return (
    <View style={styles.centeredView}>
      <BaseModal
        animationType="slide"
        transparent={true}
        visible={!!openedType}
        onRequestClose={() => {
          setOpenedType(null);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              {openedType === "age"
                ? "Выбор параметров возраста"
                : openedType === "gender"
                ? "Выбор параметров пола аудитории"
                : openedType === "date"
                ? "Выбор параметров периода"
                : null}
            </Text>
            {openedType === "date" ? (
              <View style={[styles.displayFlex, { marginTop: 23 }]}>
                <DateTimePicker
                  value={from}
                  onChange={onChange}
                  testID="dateTimePicker"
                  mode="date"
                  display="default"
                />
                <Text>{"   :"}</Text>
                <DateTimePicker
                  value={to}
                  onChange={onChange2}
                  testID="dateTimePicker"
                  mode="date"
                  display="default"
                />
              </View>
            ) : openedType === "age" ? (
              <View style={[styles.displayFlex, { width: 290 }]}>
                <TextInput
                  onChangeText={handleMinAgeChange}
                  value={minAge}
                  keyboardType="numeric"
                  style={styles.numberInput}
                />
                <Text style={styles.marginTop}>-</Text>
                <TextInput
                  onChangeText={handleMaxAgeChange}
                  value={maxAge}
                  keyboardType="numeric"
                  style={styles.numberInput}
                />
              </View>
            ) : openedType === "gender" ? (
              <View style={[styles.displayFlex, { width: 290 }]}>
                <TouchableOpacity
                  onPress={() => setGender("MALE")}
                  style={
                    gender === "MALE"
                      ? { ...styles.genderBtn, backgroundColor: "#747487" }
                      : styles.genderBtn
                  }
                >
                  <Text
                    style={
                      gender === "MALE" ? styles.textWhite : styles.textBlack
                    }
                  >
                    Мужчины
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setGender("FEMALE")}
                  style={
                    gender === "FEMALE"
                      ? { ...styles.genderBtn, backgroundColor: "#747487" }
                      : styles.genderBtn
                  }
                >
                  <Text
                    style={
                      gender === "FEMALE" ? styles.textWhite : styles.textBlack
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
