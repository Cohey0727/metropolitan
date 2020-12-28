import React, {ComponentType} from 'react';
import {FieldProps} from 'formik';
import BaseCheckbox, {CheckboxProps} from '@material-ui/core/Checkbox';
import {makeStyles, Theme} from '@material-ui/core/styles';
import wrapField from './wrapField';
import {FormControlLabel} from '@material-ui/core';

type Props = FieldProps<boolean> & CheckboxProps & {label: string};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(1, 1, 1, 2),
    minWidth: '42%',
    alignItems: 'center',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      minWidth: '84%',
    },
  },
  switch: {},
}));

export function Checkbox(props: Props) {
  const {field, label, ...rest} = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <FormControlLabel
        {...field}
        control={
          <BaseCheckbox
            {...rest}
            className={classes.switch}
            checked={field.value}
            color='primary'
          />
        }
        label={label}
        labelPlacement='end'
      />
    </div>
  );
}

export default wrapField(Checkbox as ComponentType<FieldProps>);
