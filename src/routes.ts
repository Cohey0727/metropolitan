import ProjectLayout from './components/templates/ProjectLayout';
import {RouteConfig} from 'react-router-config';
import Board from './components/pages/Board';

const routes: RouteConfig[] = [
  {
    component: ProjectLayout,
    routes: [
      {
        key: 'board',
        component: Board,
        path: '',
      },
    ],
  },
];

export default routes;
