export type List = {
  listId: string;
  title: string;
};

export type Board = {
  boardId: string;
  title: string;
  description: string;
  lists: List[];
};

export type Project = {
  projectId: string;
  title: string;
  description: string;
  boards: Board[];
};
