import {Board, List, Project} from './project';
import {AuthUser} from './user';

export type Ticket = {
  projectId: Project['projectId'];
  ticketId: string;
  currentPosition: {
    board: Board['boardId'];
    list: List['listId'];
  };
  order: number;
  author: AuthUser['email'];
  assignees: {[BoardId: string]: AuthUser['email']};
  title: string;
  description: string;
  createDate: string;
  dueDate: string;
};
