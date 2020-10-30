import {Theme} from '@material-ui/core';
import {styled} from '@material-ui/styles';
import Container from './Container';
import {CssProps} from '../common/style';

type OwnProps = {};

type Props = OwnProps & Partial<CssProps>;

const Column = styled(Container)<Theme, Props>({
  display: 'flex',
  flexDirection: 'column',
});

export default Column;
