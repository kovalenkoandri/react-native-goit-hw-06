import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const SvgCreateUnfocused = () => (
  <Svg width={40} height={40} fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20.5 13.5h-1v6h-6v1h6v6h1v-6h6v-1h-6v-6Z"
      fill="#212121"
      fillOpacity={0.8}
    />
  </Svg>
);

export default SvgCreateUnfocused;
