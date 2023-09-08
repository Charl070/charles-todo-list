type Todo = {
  id: number;
  completed?: boolean;
  title?: string;
};

type InsertTodo = {
  completed?: boolean;
  title?: string;
};

type AppContextType = {
  todos: Todo[];
  addTodo: ({ completed, title }: InsertTodo) => void;
  updateTodo: ({ completed, title, id }: Todo) => void;
  deleteTodo: (id: number) => void;
};
