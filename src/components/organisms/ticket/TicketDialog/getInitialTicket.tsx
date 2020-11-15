import {Ticket} from '../../../../types';

const getInitialTicket = (
  projectId: string,
  boardId: string,
  listId: string,
  author: string
) => {
  return {
    assignees: {},
    author: author,
    createDate: '',
    currentPosition: {board: boardId, list: listId},
    description: '',
    dueDate: '',
    order: 0,
    title: '',
    projectId: projectId,
    ticketId: '',
  } as Ticket;
};

export default getInitialTicket;
