import * as React from 'react';
import Svg, { G, Rect, Defs, ClipPath, Path } from 'react-native-svg';

const SvgComponent = () => (
  <Svg width={70} height={40} fill="none" xmlns="http://www.w3.org/2000/svg">
    <G clipPath="url(#a)">
      <Rect width={70} height={40} rx={20} fill="#FF6C00" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h70v40H0z" />
      </ClipPath>
    </Defs>

    <Svg width={40} height={40} fill="none" xmlns="http://www.w3.org/2000/svg">
      <G transform="translate(14, 0)">
        <Path
          d="M28 29v-2a4 4 0 0 0-4-4h-8a4 4 0 0 0-4 4v2"
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          clipRule="evenodd"
          d="M20 19a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  </Svg>
);

export default SvgComponent;
