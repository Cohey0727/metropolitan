import {Board, List, Project} from './project';
import {User} from './user';

export type Ticket = {
  projectId: Project['projectId'];
  ticketId: string;
  currentPosition: {
    board: Board['boardId'];
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
