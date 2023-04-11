import React, { Dispatch } from "react";
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

interface Props {
  openedType: string | null;
  setOpenedType: React.Dispatch<
    React.SetStateAction<"age" | "gender" | "date" | null>
  >;
  from: Date;
  setFrom: React.Dispatch<React.SetStateAction<Date>>;
  to: Date;
  setTo: React.Dispatch<React.SetStateAction<Date>>;
  minAge: string;
  maxAge: string;
  setMinAge: Dispatch<string>;
  setMaxAge: Dispatch<string>;
  gender: string;
  setGender: Dispatch<string>;
  save: () => void;
}

export const Modal: React.FC<Props> = ({
  openedType,
  setOpenedType,
  setFrom,
  from,
  to,
  setTo,
  minAge,
  setMinAge,
  maxAge,
  setMaxAge,
  gender,
  setGender,
  save,
}) => {
  const onChange = (
    enent: DateTimePickerEvent,
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
    save();
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
              <View style={styles.dateFlex}>
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
              <View style={styles.modalParams}>
                <TextInput
                  onChangeText={handleMinAgeChange}
                  value={minAge}
                  keyboardType="numeric"
                  style={styles.num}
                />
                <Text style={styles.marginTop}>-</Text>
                <TextInput
                  onChangeText={handleMaxAgeChange}
                  value={maxAge}
                  keyboardType="numeric"
                  style={styles.num}
                />
              </View>
            ) : openedType === "gender" ? (
              <View style={styles.modalParams}>
                <TouchableOpacity
                  onPress={() => setGender("MALE")}
                  style={
                    gender === "MALE"
                      ? styles.genderBtnActive
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
                      ? styles.genderBtnActive
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
  dateFlex: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 23,
  },
  modalParams: {
    flexDirection: "row",
    justifyContent: "space-between",
    textAlign: "center",
    alignItems: "center",
    width: 290,
  },
  num: {
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
  genderBtnActive: {
    backgroundColor: "#747487",
    width: 134,
    height: 48,
    justifyContent: "center",
    borderRadius: 5,
    marginTop: 16,
  },
  textWhite: { color: "white", textAlign: "center" },
  textBlack: { color: "black", textAlign: "center" },
});

export default Modal;
