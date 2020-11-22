import React, {useCallback} from 'react';
import TopBar from './TopBar';
import {renderRoutes, RouteConfigComponentProps} from 'react-router-config';
import auth0Hoc from '../../../auth/auth0Hoc';
import UsersProvider from '../../../api/user/providers';
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

const InitialLayout = (props: Props) => {
  const {route} = props;
  const classes = useStyles();

  return (
    <UsersProvider>
      <div className={classes.root}>
        <TopBar />
        <div className={classes.wrapper}>{renderRoutes(route!.routes)}</div>
      </div>
    </UsersProvider>
  );
};

export default auth0Hoc(InitialLayout);
