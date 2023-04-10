import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const Add = (props: SvgProps) => (
  <Svg width={16} height={16} fill="none" {...props}>
    <Path
      fill="#000"
      d="M8.582.47H7.419a.942.942 0 0 0-.942.942v13.351c0 .52.421.942.942.942h1.163c.52 0 .942-.421.942-.942V1.412A.942.942 0 0 0 8.582.47Z"
    />
    <Path
      fill="#000"
      d="M15.618 8.67V7.505a.942.942 0 0 0-.942-.942H1.325a.942.942 0 0 0-.942.942v1.163c0 .52.421.942.942.942h13.351c.52 0 .942-.422.942-.942Z"
    />
  </Svg>
);
export default Add;
