import {Theme} from '@material-ui/core';
import {styled} from '@material-ui/styles';
import BasePaper from '@material-ui/core/Paper';
import {cssCreator, CssProps} from '../common/style';

type OwnProps = {};

type Props = OwnProps & Partial<CssProps>;

const Paper = styled(BasePaper)<Theme, Props>(cssCreator);

export default Paper;
