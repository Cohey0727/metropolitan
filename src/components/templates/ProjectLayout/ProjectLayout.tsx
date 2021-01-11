import React, {useMemo} from 'react';
import TopBar from './TopBar';
import SideBar from './SideBar';
import MobileNavigation from './MobileNavigation';
import {renderRoutes, RouteConfigComponentProps} from 'react-router-config';
import {ProjectUsersProvider} from '../../../api/user/providers';
import {makeStyles} from '@material-ui/core';
import {Project} from '../../../types';
import {ProjectProvider} from '../../../api/project/providers';
import {Column} from '../../atoms/containers';
import useIsMobile from '../../../utils/hooks/useIsMobile';

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
      paddingBottom: 60,
    },
    boxSizing: 'border-box',
  },
}));

export type ProjectPathParams = {projectId: string};
export type ProjectRouteProps = RouteConfigComponentProps<ProjectPathParams>;
export type LocationState = {project?: Project};
type Props = {} & RouteConfigComponentProps<any>;

const ProjectProviders: React.FC<any>[] = [ProjectUsersProvider, ProjectProvider];

const ProjectLayout = (props: Props) => {
  const {route} = props;
  const classes = useStyles();
  const isMobile = useIsMobile();
  return (
    <div className={classes.root}>
      <TopBar />
      {isMobile ? <MobileNavigation /> : <SideBar />}
      <Column className={classes.wrapper} width={'100vw'} height={'100vh'}>
        {renderRoutes(route!.routes)}
      </Column>
    </div>
  );
};

export default ProjectProviders.reduce((Acc, Provider) => {
  return (props: any) => (
    <Provider>
      <Acc {...props} />
    </Provider>
  );
}, ProjectLayout);
