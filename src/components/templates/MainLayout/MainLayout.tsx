import React from 'react';
// import {Outlet} from 'react-router-dom';
import {makeStyles, useTheme} from '@material-ui/core';
import TopBar from './TopBar';
import SideBar from './SideBar';
import {renderRoutes, RouteConfigComponentProps} from 'react-router-config';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%',
    overflow: 'hidden',
    width: '100%',
  },
  wrapper: {
    overflow: 'hidden',
    paddingTop: 48,
    paddingLeft: 96,
    width: '100vw',
    height: '100vh',
    boxSizing: 'border-box',
  },
}));

type Props = {} & RouteConfigComponentProps<any>;

const MainLayout = (props: Props) => {
  const {route} = props;
  const theme = useTheme();
  console.debug({theme});
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TopBar />
      <SideBar />
      <div className={classes.wrapper}>{renderRoutes(route!.routes)}</div>
    </div>
  );
};

export default MainLayout;
