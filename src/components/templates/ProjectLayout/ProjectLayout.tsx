import React from 'react';
import TopBar from './TopBar';
import SideBar from './SideBar';
import {renderRoutes, RouteConfigComponentProps} from 'react-router-config';
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
    paddingLeft: 96,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 0,
    },
    width: '100vw',
    height: '100vh',
    boxSizing: 'border-box',
  },
}));

export type ProjectPathParams = {projectId: string};
export type ProjectRouteProps = RouteConfigComponentProps<ProjectPathParams>;
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

export default ProjectLayout;
