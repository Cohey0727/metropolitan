import {styled} from '@material-ui/styles';
import {Theme} from '@material-ui/core';
import {cssCreator, CssProps} from '../common/style';

type OwnProps = {};

type Props = OwnProps & Partial<CssProps>;

const Container = styled('div')<Theme, Props>(cssCreator);

export default Container;
