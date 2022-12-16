import React from "react";
import Svg, { Path } from "react-native-svg";

const CartIcon: React.FC = () => {
  return (
    <Svg width={28} height={28} viewBox="0 0 24 22" fill="none">
      <Path
        d="M4.10449 8.17948L9.63982 1.92382C10.7297 0.69206 12.6042 0.692059 13.6942 1.92382L19.2295 8.17948M22.217 9.68163L19.0743 20.1682C18.9264 20.6619 18.4721 21 17.9568 21H5.45286C4.94002 21 4.48731 20.6651 4.33725 20.1747L1.12844 9.68808C0.898986 8.93822 1.45986 8.18005 2.24405 8.18005H21.0994C21.8808 8.18005 22.4413 8.93315 22.217 9.68163Z"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default CartIcon;
