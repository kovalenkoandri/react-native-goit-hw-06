import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const SvgCreatePhotoIcon = ({ fill = '#BDBDBD' }) => (
  <Svg
    width={20}
    height={18}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M10 13.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z"
      fill={fill}
    />
    <Path
      d="M7 0 5.17 2H2C.9 2 0 2.9 0 4v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2h-3.17L13 0H7Zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5Z"
      fill={fill}
    />
  </Svg>
);

export default SvgCreatePhotoIcon;
