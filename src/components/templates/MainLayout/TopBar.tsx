import React from 'react';
import {Link as RouterLink} from 'react-router-dom';
// import clsx from 'clsx';
import {AppBar, Toolbar, makeStyles} from '@material-ui/core';
// import Logo from "src/components/Logo";

const useStyles = makeStyles((theme) => ({
  root: {
    height: 48,
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(0, 2),
  },
  toolbar: {},
}));

const TopBar = () => {
  const classes = useStyles();
  return (
    <AppBar className={classes.root} elevation={0}>
      <RouterLink to='/'>Metropolitan</RouterLink>
    </AppBar>
  );
};

export default TopBar;
