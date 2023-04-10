import * as React from "react";
import Svg, { SvgProps, Path, Circle } from "react-native-svg";

const User = (props: SvgProps) => (
  <Svg width={25} height={22} fill="none" {...props}>
    <Path
      d="M11 0C8.824 0 6.698.65 4.889 1.867a11.06 11.06 0 0 0-4.052 4.97 11.147 11.147 0 0 0-.626 6.4 11.1 11.1 0 0 0 3.01 5.67 10.976 10.976 0 0 0 5.633 3.032 10.93 10.93 0 0 0 6.356-.63 11.017 11.017 0 0 0 4.936-4.08 11.127 11.127 0 0 0-1.372-13.981A10.975 10.975 0 0 0 11 0ZM6.286 19.285v-1.09c0-.628.249-1.232.69-1.677a2.352 2.352 0 0 1 1.667-.696h4.714c.625.001 1.224.251 1.666.696.442.445.69 1.049.691 1.678v1.09a9.3 9.3 0 0 1-9.428 0Zm10.993-1.148a3.97 3.97 0 0 0-1.169-2.756 3.916 3.916 0 0 0-2.753-1.14H8.643a3.916 3.916 0 0 0-2.753 1.14 3.97 3.97 0 0 0-1.17 2.756 9.506 9.506 0 0 1-2.88-4.836 9.555 9.555 0 0 1 .351-5.629 9.484 9.484 0 0 1 3.46-4.434 9.384 9.384 0 0 1 5.35-1.675c1.91 0 3.775.584 5.348 1.675a9.483 9.483 0 0 1 3.46 4.434c.682 1.797.804 3.76.353 5.629a9.507 9.507 0 0 1-2.883 4.836Z"
      fill="#000"
    />
    <Circle cx={11} cy={8.891} r={3.964} stroke="#000" strokeWidth={1.5} />
  </Svg>
);

export default User;