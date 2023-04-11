import { SafeAreaView, TouchableOpacity, StyleSheet, View } from "react-native";

import Message from "../svgs/Message";
import Heart from "../svgs/Heart";
import User from "../svgs/User";
import Home from "../svgs/Home";
import Add from "../svgs/Add";

export default function Footer() {
  return (
    <SafeAreaView style={styles.Footer}>
      <View style={styles.icons}>
        <TouchableOpacity>
          <Home />
        </TouchableOpacity>
        <TouchableOpacity>
          <Heart />
        </TouchableOpacity>
        <TouchableOpacity>
          <Add />
        </TouchableOpacity>
        <TouchableOpacity>
          <Message />
        </TouchableOpacity>
        <TouchableOpacity>
          <User />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  icons: {
    paddingTop: 27,
    height: 48,
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "center",
  },
  color: {
    color: "white",
  },
});
