import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const Arrow = (props: SvgProps) => (
  <Svg width={10} height={16} fill="none" {...props}>
    <Path
      fill="#09121F"
      d="M3.552 7.993 9.77 14.21l-1.776 1.776L0 7.993 7.994 0 9.77 1.776 3.552 7.993Z"
    />
  </Svg>
);
export default Arrow;
