import {RouteConfig} from 'react-router-config';
import Board from './components/pages/Board';
import {InitialLayout, ProjectLayout} from './components/templates';
import ProjectSelect from './components/pages/ProjectSelect';
import Members from './components/pages/Members';

const routes: RouteConfig[] = [
  {
    component: InitialLayout,
    path: '/',
    exact: true,
    routes: [
      {
        key: 'projectSelect',
        component: ProjectSelect,
        path: '/',
      },
    ],
  },
  {
    component: ProjectLayout,
    path: '/projects/:projectId',
    routes: [
      {
        key: 'projectBoard',
        component: Members,
        path: '/projects/:projectId/members',
      },
      {
        key: 'projectBoard',
        component: Board,
        path: '/projects/:projectId',
      },
    ],
  },
];

export default routes;
