import {Theme} from '@material-ui/core';
import {styled} from '@material-ui/styles';
import Container from './Container';
import {CssProps} from '../common/style';

type OwnProps = {};

type Props = OwnProps & Partial<CssProps>;

const Row = styled<any>(Container)<Theme, Props>({
  display: 'flex',
  flexDirection: 'row',
});

export default Row;
