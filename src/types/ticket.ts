import {Board, List, Project} from './project';
import {User} from './user';

export type Ticket = {
  id: string;
  projectId: Project['id'];
  currentPosition: {
    board: Board['id'];
    list: List['id'];
  };
  order: number;
  author: User['sub'];
  assignees: {[BoardId: string]: User['sub']};
  title: string;
  description: string;
  createDate: string;
  dueDate: string;
};
