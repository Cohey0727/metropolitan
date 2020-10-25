import {useLayoutEffect, useState} from 'react';
import {useWindowSize} from 'react-use';

interface ResponsiveConfig {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

const responsiveConfig: ResponsiveConfig = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
};

export type ResponsiveInfo = {
  [P in keyof ResponsiveConfig]: boolean;
};

function calculate(width: number): ResponsiveInfo {
  const newInfo = {} as ResponsiveInfo;
  Object.entries(responsiveConfig).map(([key, value]) => {
    newInfo[key as keyof ResponsiveConfig] = width >= value;
  });
  return newInfo;
}

function useResponsive() {
  const {width} = useWindowSize();
  const [responsiveInfo, setResponsiveInfo] = useState(calculate(width));
  useLayoutEffect(() => setResponsiveInfo(calculate(width)), [width]);
  return responsiveInfo;
}

export default useResponsive;
