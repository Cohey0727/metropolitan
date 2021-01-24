import People from '@material-ui/icons/People';
import {OverridableComponent} from '@material-ui/core/OverridableComponent';
import {SvgIconTypeMap} from '@material-ui/core/SvgIcon/SvgIcon';
import Timeline from '@material-ui/icons/Timeline';
import ViewWeek from '@material-ui/icons/ViewWeek';
import ListIcon from '@material-ui/icons/List';

export type ProjectMenu = {
  label: string;
  link: (projectId: string) => string;
  Icon: OverridableComponent<SvgIconTypeMap>;
};

export const projectMenus: ProjectMenu[] = [
  {
    label: 'Board',
    link: (projectId: string) => `/projects/${projectId}/boards`,
    Icon: ViewWeek,
  },
  {
    label: 'List',
    link: (projectId: string) => `/projects/${projectId}/tickets`,
    Icon: ListIcon,
  },
  {
    label: 'Flow',
    link: (projectId: string) => `/projects/${projectId}/flow`,
    Icon: Timeline,
  },
  {
    label: 'Members',
    link: (projectId: string) => `/projects/${projectId}/members`,
    Icon: People,
  },
];
