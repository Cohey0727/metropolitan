import React, {ComponentType} from 'react';
import {FieldProps} from 'formik';
import {makeStyles, Theme} from '@material-ui/core/styles';
import wrapField from './wrapField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select, {SelectProps} from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

type Option = {
  label: string;
  value: string | number;
};

type Props = {label: string; options: Option[]} & FieldProps<boolean> & SelectProps;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(1, 0),
    minWidth: '42%',
    [theme.breakpoints.down('sm')]: {
      minWidth: '84%',
      padding: theme.spacing(1),
    },
  },
  formControl: {
    minWidth: '92%',
  },
}));

export function Selector(props: Props) {
  const {field, label, options = [], ...rest} = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <FormControl variant='outlined' className={classes.formControl}>
        <InputLabel>{label}</InputLabel>
        <Select {...field} {...rest} label={label}>
          {options.map((option) => (
            <MenuItem value={option.value}>{option.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default wrapField(Selector as ComponentType<FieldProps>);
