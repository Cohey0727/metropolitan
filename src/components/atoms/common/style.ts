import {CSSProperties} from '@material-ui/styles';

export type CssProps = {
  color: CSSProperties['color'];
  backgroundColor: CSSProperties['backgroundColor'];
  width: number;
  height: number;
};

type CssCreator = {
  [P in keyof CssProps]: (props: CssProps) => CSSProperties[P];
};

export const cssCreator: CssCreator = {
  color: ({color}) => color || 'inherits',
  backgroundColor: ({backgroundColor}) => backgroundColor || 'inherits',
  width: ({width}) => (width ? `${width}px` : 'auto'),
  height: ({height}) => (height ? `${height}px` : 'auto'),
};
