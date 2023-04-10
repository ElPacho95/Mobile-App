import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const Home = (props: SvgProps) => (
  <Svg width={23} height={25} fill="none" {...props}>
    <Path
      fill="#000"
      d="M11.61 1.578a2.5 2.5 0 0 1 1.572.568l7.9 6.394a1.896 1.896 0 0 1 .654 1.43v10.553c0 .398-.077.793-.228 1.162a2.955 2.955 0 0 1-2.727 1.847h-2.332a.33.33 0 0 1-.228-.095.367.367 0 0 1-.098-.258v-3.702a2.834 2.834 0 0 0-2.821-2.841h-3.41a2.811 2.811 0 0 0-1.997.837 2.854 2.854 0 0 0-.823 2.007v3.309a.724.724 0 0 0-.027.199v.202c0 .097-.038.19-.107.258a.321.321 0 0 1-.227.092h-2.28a2.925 2.925 0 0 1-2.072-.876 3.042 3.042 0 0 1-.655-.982 3.107 3.107 0 0 1-.228-1.167V9.988c.008-.276.077-.548.2-.795.123-.248.3-.465.518-.636l.012-.01 7.728-6.32.011-.009.01-.01.012-.008a2.475 2.475 0 0 1 1.642-.622Zm0-.795c-.8 0-1.57.293-2.167.824l-.011.009-7.728 6.319c-.311.244-.563.555-.74.909a2.715 2.715 0 0 0-.283 1.144V20.52c0 .504.1 1.003.29 1.469.19.462.468.883.819 1.24a3.666 3.666 0 0 0 2.641 1.105h2.285c.294-.002.576-.12.784-.33.215-.214.337-.505.34-.81v-.202l.028-.015v-3.499c0-.542.213-1.063.594-1.449a2.01 2.01 0 0 1 1.43-.6h3.41a2.028 2.028 0 0 1 1.436.605c.379.385.59.904.59 1.444v3.705c-.001.151.027.3.083.441a1.123 1.123 0 0 0 1.033.706h2.337a3.75 3.75 0 0 0 3.465-2.342 3.84 3.84 0 0 0 .287-1.463V9.974a2.68 2.68 0 0 0-.94-2.046l-7.905-6.399a3.272 3.272 0 0 0-2.079-.746Z"
    />
  </Svg>
);
export default Home;
