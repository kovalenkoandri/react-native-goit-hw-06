import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const SvgLocationMark = () => (
  <Svg
    width={18}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      clipRule="evenodd"
      d="M17 8.364C17 14.09 9 19 9 19S1 14.09 1 8.364C1 4.297 4.582 1 9 1s8 3.297 8 7.364v0Z"
      stroke="#BDBDBD"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      clipRule="evenodd"
      d="M9 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
      stroke="#BDBDBD"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default SvgLocationMark;
