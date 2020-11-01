import React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {AppBar} from '@material-ui/core';
import makeResponsiveStyle from '../../../theme/makeResponsiveStyle';
import {ResponsiveInfo} from '../../../theme/useResponsive';
import {Container} from '../../atoms/containers';
import {AccountUser} from '../../organisms/account';

export function getTopBarHeight(responsiveInfo: ResponsiveInfo) {
  return 48;
}

const useStyles = makeResponsiveStyle((theme, responsiveInfo) => ({
  root: {
    height: getTopBarHeight(responsiveInfo),
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
        <RouterLink to='/'>Metropolitan</RouterLink>
      </Container>
      <Container className={classes.rightContainer}>
        <AccountUser />
      </Container>
    </AppBar>
  );
};

export default TopBar;
