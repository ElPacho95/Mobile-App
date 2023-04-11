import React from "react";
import { Text, TouchableOpacity } from "react-native";
import ContentLoader, { Rect } from "react-content-loader/native";

interface Props {
  title: string;
}

const Loader: React.FC<Props> = (props) => (
  <ContentLoader
    speed={1}
    width={323}
    height={47}
    viewBox="0 0 323 47"
    backgroundColor="#747487"
    foregroundColor="#ecebeb"
    {...props}
  >
    <Rect x="127" y="48" rx="3" ry="3" width="53" height="11" />
    <Rect x="187" y="48" rx="3" ry="3" width="72" height="11" />
    <Rect x="18" y="48" rx="3" ry="3" width="100" height="11" />
    <Rect x="0" y="71" rx="3" ry="3" width="37" height="11" />
    <Rect x="0" y="0" rx="5" ry="5" width="323" height="47" />
    <TouchableOpacity
      style={{ alignItems: "center", justifyContent: "center", height: 47 }}
    >
      <Text style={{ color: "white", fontFamily: "Medium", lineHeight: 20 }}>
        {props.title}
      </Text>
    </TouchableOpacity>
  </ContentLoader>
);

export default Loader;
