import {Board, List} from './project';
import {User} from './user';

export type Ticket = {
  id: string;
  projectId: string;
  currentPosition: {
    board: Board['id'];
    list: List['id'];
  };
  author: User['sub'];
  assignees: {[BoardId: string]: User['sub']};
  title: string;
  description: string;
  createDate: string;
  dueDate: string;
};
