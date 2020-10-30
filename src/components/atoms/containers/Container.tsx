import {CSSProperties, styled} from '@material-ui/styles';
import {Theme} from '@material-ui/core';

type CssProps = {
  color: CSSProperties['color'];
  backgroundColor: CSSProperties['backgroundColor'];
  width: number;
  height: number;
};

type OwnProps = {};

type Props = OwnProps & Partial<CssProps>;

const Container = styled<any>('div')<Theme, Props>({
  color: ({color}) => color || 'inherits',
  backgroundColor: ({backgroundColor}) => backgroundColor || 'inherits',
  width: ({width}) => width || 'auto',
  height: ({height}) => height || 'auto',
});

export default Container;
