import React, {ComponentType} from 'react';
import {FieldProps} from 'formik';
import BaseSwitch, {SwitchProps} from '@material-ui/core/Switch';
import {makeStyles, Theme} from '@material-ui/core/styles';
import wrapField from './wrapField';
import {FormControlLabel} from '@material-ui/core';

type Props = FieldProps<boolean> & SwitchProps & {label: string};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(1),
    minWidth: '42%',
    alignItems: 'center',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      minWidth: '84%',
    },
  },
  switch: {},
}));

export function Switch(props: Props) {
  const {field, label, ...rest} = props;
  const classes = useStyles();
  console.debug({field});
  return (
    <div className={classes.root}>
      <FormControlLabel
        {...field}
        control={
          <BaseSwitch {...rest} className={classes.switch} checked={field.value} color='primary' />
        }
        label={label}
        labelPlacement='start'
      />
    </div>
  );
}

export default wrapField(Switch as ComponentType<FieldProps>);
