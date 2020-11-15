import React from 'react';
import TopBar, {getTopBarHeight} from './TopBar';
import SideBar, {getSideBarWidth} from './SideBar';
import {renderRoutes, RouteConfigComponentProps} from 'react-router-config';
import makeResponsiveStyle from '../../../theme/makeResponsiveStyle';
import auth0Hoc from '../../../auth/auth0Hoc';
import UsersProvider from '../../../api/user/providers';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom/Zoom';
import Add from '@material-ui/icons/Add';

const useStyles = makeResponsiveStyle((theme, responsiveInfo) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%',
    overflow: 'hidden',
    width: '100%',
    position: 'relative',
  },
  wrapper: {
    overflow: 'hidden',
    paddingTop: getTopBarHeight(responsiveInfo),
    paddingLeft: getSideBarWidth(responsiveInfo),
    width: '100vw',
    height: '100vh',
    boxSizing: 'border-box',
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(4),
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
      <Zoom in={true}>
        <Fab
          className={classes.fab}
          aria-label={'New Ticket'}
          color={'primary'}
        >
          <Add />
        </Fab>
      </Zoom>
    </UsersProvider>
  );
};

export default auth0Hoc(ProjectLayout);
