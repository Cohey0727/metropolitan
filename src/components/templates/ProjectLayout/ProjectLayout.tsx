import React, {useCallback} from 'react';
import TopBar from './TopBar';
import SideBar from './SideBar';
import {renderRoutes, RouteConfigComponentProps} from 'react-router-config';
import auth0Hoc from '../../../auth/auth0Hoc';
import UsersProvider from '../../../api/user/providers';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom/Zoom';
import Add from '@material-ui/icons/Add';
import modalHandler from '../../../utils/ui/modal/modalHandler';
import NewTicketDialog from '../../organisms/ticket/TicketDialog';
import {useCurrentUser} from '../../../api/user/hooks';
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%',
    overflow: 'hidden',
    width: '100%',
    position: 'relative',
  },
  wrapper: {
    overflow: 'hidden',
    paddingTop: 48,
    paddingLeft: 96,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 0,
    },
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
  const user = useCurrentUser();
  const classes = useStyles();

  const openNewTicket = useCallback(() => {
    modalHandler.open(NewTicketDialog, {user});
  }, [user]);

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
          onClick={openNewTicket}
        >
          <Add />
        </Fab>
      </Zoom>
    </UsersProvider>
  );
};

export default auth0Hoc(ProjectLayout);
