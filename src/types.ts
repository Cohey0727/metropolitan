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

export type Ticket = {
  id: string;
  projectId: string;
  currentPosition: {
    board: Board['id'];
    list: List['id'];
  };
  author: string;
  title: string;
  description: string;
};
