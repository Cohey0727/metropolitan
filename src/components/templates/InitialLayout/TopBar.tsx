import React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {AppBar, makeStyles} from '@material-ui/core';
import {Container} from '../../atoms/containers';
import {AccountUser} from '../../organisms/account';
import {FullLogo} from '../../organisms/common';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 48,
    display: 'flex',
    padding: theme.spacing(0, 4, 0, 2),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toolbar: {},
  leftContainer: {},
  rightContainer: {},
}));

const TopBar = () => {
  const classes = useStyles();
  return (
    <AppBar className={classes.root} elevation={0}>
      <Container className={classes.leftContainer}>
        <RouterLink to='/'>
          <FullLogo />
        </RouterLink>
      </Container>
      <Container className={classes.rightContainer}>
        <AccountUser />
      </Container>
    </AppBar>
  );
};

export default TopBar;
