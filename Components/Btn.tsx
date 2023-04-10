import React, { Dispatch, SetStateAction } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface Props {
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
  title: string;
}

export const Btn: React.FC<Props> = ({ active, setActive, title }) => {
  return (
    <TouchableOpacity
      onPress={() => setActive(true)}
      style={active ? styles.btnActive : styles.btn}
    >
      <Text style={active ? styles.btnActive.text : styles.btn.text}>
        {title}
      </Text>
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
    text: { color: "black" },
  },
  btnActive: {
    backgroundColor: "#747487",
    width: 161,
    height: 39,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    borderRadius: 5,
    text: { color: "white" },
  },
});

export default Btn;
