import React from 'react';
import TopBar, {getTopBarHeight} from './TopBar';
import SideBar, {getSideBarWidth} from './SideBar';
import {renderRoutes, RouteConfigComponentProps} from 'react-router-config';
import makeResponsiveStyle from '../../../theme/makeResponsiveStyle';
import auth0Hoc from '../../../auth/auth0Hoc';
import UsersProvider from '../../../api/user/providers';

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

const ProjectLayout = (props: Props) => {
  const {route} = props;
  const classes = useStyles();

  return (
    <UsersProvider>
      <div className={classes.root}>
        <TopBar />
        <SideBar />
        <div className={classes.wrapper}>{renderRoutes(route!.routes)}</div>
      </div>
    </UsersProvider>
  );
};

export default auth0Hoc(ProjectLayout);
