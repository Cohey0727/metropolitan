import React, {ComponentProps} from 'react';
import Select from '@material-ui/core/Select';

import {StylesConfig} from 'react-select/src/styles';
import MenuItem from '@material-ui/core/MenuItem';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {FormControl} from '@material-ui/core';

type SelectorValue = string;

export type SelectorOption = {
  label: string;
  value: SelectorValue;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

type Props = {
  options: SelectorOption[];
  onSelect: (value: SelectorValue) => void;
} & Omit<ComponentProps<typeof Select>, 'onSelect'>;

export default function SimpleSelect(props: Props) {
  const {options, onSelect, ...others} = props;
  const classes = useStyles();
  
  const handleChange = (event: React.ChangeEvent<{value: unknown}>) => {
    const value = event.target.value as SelectorValue;
    onSelect(value);
  };

  return (
    <FormControl className={classes.formControl}>
      <Select onChange={handleChange} {...others}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
