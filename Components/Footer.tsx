import {
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from "react-native";

import User from "../svgs/User";
import Home from "../svgs/Home";
import Heart from "../svgs/Heart";
import Add from "../svgs/Add";
import Message from "../svgs/Message";

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
    borderColor: "#C9C9C9",
    borderWidth: 1,
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  icons: {
    paddingTop: 7,
    height: 48,
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "center",
  },
  color: {
    color: "white",
  },
});
