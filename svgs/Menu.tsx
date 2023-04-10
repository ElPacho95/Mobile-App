import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const Menu = (props: SvgProps) => (
  <Svg width={19} height={14} fill="none" {...props}>
    <Path stroke="#000" strokeWidth={2} d="M0 1h19M0 7h19M0 13h19" />
  </Svg>
);
export default Menu;
