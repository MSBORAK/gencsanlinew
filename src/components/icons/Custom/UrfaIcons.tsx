import React from 'react';
import Svg, { Path, Circle, G } from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: string;
  opacity?: number;
  style?: any;
}

// Professional Göbeklitepe
export const UrfaIcon_Gobeklitepe = ({ size = 24, color = "white", opacity = 1, style }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 64 64" fill="none" style={style} opacity={opacity}>
    <Path d="M14 16H50V24C50 25.1046 49.1046 26 48 26H16C14.8954 26 14 25.1046 14 24V16Z" stroke={color} strokeWidth="3" strokeLinejoin="round"/>
    <Path d="M26 26V48C26 49.1046 26.8954 50 28 50H36C37.1046 50 38 49.1046 38 48V26" stroke={color} strokeWidth="3" strokeLinejoin="round"/>
    <Path d="M20 20H24" stroke={color} strokeWidth="3" strokeLinecap="round"/>
    <Path d="M40 20H44" stroke={color} strokeWidth="3" strokeLinecap="round"/>
    <Path d="M32 34V40" stroke={color} strokeWidth="3" strokeLinecap="round"/>
  </Svg>
);

// Professional Harran Evi
export const UrfaIcon_Harran = ({ size = 24, color = "white", opacity = 1, style }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 64 64" fill="none" style={style} opacity={opacity}>
    <Path d="M12 54H52" stroke={color} strokeWidth="3" strokeLinecap="round"/>
    <Path d="M16 54V38C16 24.7452 27.7452 14 40 14C46.6274 14 52 19.3726 52 26V54" stroke={color} strokeWidth="3" strokeLinejoin="round"/>
    <Path d="M30 54V42C30 40.8954 30.8954 40 32 40H36C37.1046 40 38 40.8954 38 42V54" stroke={color} strokeWidth="3" strokeLinejoin="round"/>
    <Path d="M24 30H32" stroke={color} strokeWidth="3" strokeLinecap="round"/>
    <Path d="M42 38H48" stroke={color} strokeWidth="3" strokeLinecap="round"/>
  </Svg>
);

// Professional Balık
export const UrfaIcon_Balik = ({ size = 24, color = "white", opacity = 1, style }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 64 64" fill="none" style={style} opacity={opacity}>
    <Path d="M8 32C8 32 16 24 28 24C40 24 48 30 54 32C60 34 54 32 54 32C54 32 60 30 54 28M54 32C54 32 60 34 54 36M8 32C8 32 16 40 28 40C40 40 48 34 54 32" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <Circle cx="20" cy="31" r="2" fill={color} />
    <Path d="M28 24C30 20 34 18 38 19" stroke={color} strokeWidth="3" strokeLinecap="round"/>
    <Path d="M28 40C30 44 34 46 38 45" stroke={color} strokeWidth="3" strokeLinecap="round"/>
  </Svg>
);

// We are not using Insan or Arti for now to keep it clean
// export const UrfaIcon_Insan ...
// export const UrfaIcon_Arti ...

