import {Board, List, Project} from './project';
import {User} from './user';

export type Ticket = {
  projectId: Project['projectId'];
  ticketId: string;
  currentPosition: {
    board: Board['boardId'];
    list: List['listId'];
  };
  order: number;
  author: User['email'];
  assignees: {[BoardId: string]: User['email']};
  title: string;
  description: string;
  createDate: string;
  dueDate: string;
};
