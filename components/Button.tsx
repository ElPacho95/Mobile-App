import React, { Dispatch, SetStateAction } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface Props {
  active: boolean;
  onPress: () => void;
  title: string;
}

export const Button: React.FC<Props> = ({ active, onPress, title }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={active ? styles.btnActive : styles.btn}
    >
      <Text style={active ? styles.textWhite : styles.textBlack}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    borderWidth: 1,
    backgroundColor: "transparent",
    borderColor: "#C9C9C9",
    borderRadius: 5,
    width: 161,
    height: 39,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  textBlack: { color: "black" },
  btnActive: {
    backgroundColor: "#747487",
    width: 161,
    height: 39,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    borderRadius: 5,
  },
  textWhite: { color: "white" },
});

export default Button;
