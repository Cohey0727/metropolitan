import {CSSProperties} from '@material-ui/styles';
import {CreateCSSProperties} from '@material-ui/styles/withStyles/withStyles';
import {Theme} from '@material-ui/core';

export type CssProps = {
  color: CSSProperties['color'];
  backgroundColor: CSSProperties['backgroundColor'];
  width: number | string;
  minWidth: number | string;
  maxWidth: number | string;
  height: number | string;
  minHeight: number | string;
  maxHeight: number | string;
  padding: number | number[];
  margin: number | number[];
  display: CSSProperties['display'];
  flex: CSSProperties['flex'];
  flexDirection: CSSProperties['flexDirection'];
};

const spaceUnit = 8;
const spaceCreator = (values?: number | number[] | undefined) =>
  Array.isArray(values)
    ? values.map((value) => (value ? `${value * spaceUnit}px` : '0')).join(' ')
    : typeof values === 'number'
    ? values * spaceUnit
    : values;

type CssCreator = (
  props: {theme: Theme} & Partial<CssProps>
) => CreateCSSProperties<Partial<CssProps>>;

export const cssCreator: CssCreator = ({theme, ...props}) => {
  const {
    color,
    backgroundColor,
    width,
    minWidth,
    maxWidth,
    height,
    minHeight,
    maxHeight,
    padding,
    margin,
    display,
    flex,
    flexDirection,
  } = props;
  return {
    color: color || 'inherits',
    backgroundColor: backgroundColor || 'inherits',
    width: typeof width === 'number' ? `${width}px` : width,
    minWidth: typeof minWidth === 'number' ? `${minWidth}px` : minWidth,
    maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth,
    height: typeof height === 'number' ? `${height}px` : height,
    minHeight: typeof height === 'number' ? `${minHeight}px` : minHeight,
    maxHeight: typeof height === 'number' ? `${maxHeight}px` : maxHeight,
    padding: spaceCreator(padding),
    margin: spaceCreator(margin),
    display,
    flex,
    flexDirection,
  };
};
