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
