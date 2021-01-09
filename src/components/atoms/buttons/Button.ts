import {styled} from '@material-ui/core';
import BaseButton from '@material-ui/core/Button';

const Button = styled(BaseButton)(({theme}) => ({
  margin: theme.spacing(0.5, 0.5),
}));

export default Button;
