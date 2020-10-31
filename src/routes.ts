import MainLayout from './components/templates/MainLayout';
import {RouteConfig} from 'react-router-config';
import Board from './components/pages/Board';

const routes: RouteConfig[] = [
  {
    component: MainLayout,
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
