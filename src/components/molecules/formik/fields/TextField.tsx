import React from 'react';
import {FieldProps} from 'formik';
import BaseTextField, {TextFieldProps} from '@material-ui/core/TextField';
import {makeStyles, Theme} from '@material-ui/core/styles';
import wrapField from './wrapField';

type Props = FieldProps<string> &
  Omit<TextFieldProps, 'onChange' | 'variant' | 'className'>;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(1),
    minWidth: '42%',
    [theme.breakpoints.down('sm')]: {
      minWidth: '84%',
    },
  },
  textField: {
    minWidth: '92%',
  },
}));

export function TextField(props: Props) {
  const {field, ...rest} = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <BaseTextField
        {...rest}
        {...field}
        className={classes.textField}
        variant="outlined"
        inputProps={{
          autoComplete: 'new-password',
          form: {
            autoComplete: 'off',
          },
        }}
      />
    </div>
  );
}

export default wrapField(TextField);
