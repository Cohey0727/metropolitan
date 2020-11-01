import {User} from './user';

export type List = {
  id: string;
  title: string;
};

export type Board = {
  id: string;
  title: string;
  description: string;
  lists: List[];
};

export type Project = {
  id: string;
  title: string;
  description: string;
  boards: Board[];
  members: User['sub'][];
};
