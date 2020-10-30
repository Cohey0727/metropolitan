import {CSSProperties} from '@material-ui/styles';
import {CreateCSSProperties} from '@material-ui/styles/withStyles/withStyles';
import {Theme} from '@material-ui/core';

export type CssProps = {
  color: CSSProperties['color'];
  backgroundColor: CSSProperties['backgroundColor'];
  width: number | string;
  height: number | string;
  padding: number | number[];
  margin: number | number[];
  display: CSSProperties['display'];
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
    height,
    padding,
    margin,
    display,
    flexDirection,
  } = props;
  return {
    color: color || 'inherits',
    backgroundColor: backgroundColor || 'inherits',
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    padding: spaceCreator(padding),
    margin: spaceCreator(margin),
    display,
    flexDirection,
  };
};
