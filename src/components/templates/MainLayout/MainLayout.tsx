import React from 'react';
// import {Outlet} from 'react-router-dom';
import TopBar, {getTopBarHeight} from './TopBar';
import SideBar, {getSideBarWidth} from './SideBar';
import {renderRoutes, RouteConfigComponentProps} from 'react-router-config';
import makeResponsiveStyle from '../../../theme/makeResponsiveStyle';
import auth0Hoc from '../../../auth/auth0Hoc';

const useStyles = makeResponsiveStyle((theme, responsiveInfo) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%',
    overflow: 'hidden',
    width: '100%',
  },
  wrapper: {
    overflow: 'hidden',
    paddingTop: getTopBarHeight(responsiveInfo),
    paddingLeft: getSideBarWidth(responsiveInfo),
    width: '100vw',
    height: '100vh',
    boxSizing: 'border-box',
  },
}));

type Props = {} & RouteConfigComponentProps<any>;

const MainLayout = (props: Props) => {
  const {route} = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TopBar />
      <SideBar />
      <div className={classes.wrapper}>{renderRoutes(route!.routes)}</div>
    </div>
  );
};

export default auth0Hoc(MainLayout);
