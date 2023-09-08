import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

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

// TodoContext
const TodoContext = createContext<AppContextType>({
  todos: [],
  addTodo: () => null,
  updateTodo: () => null,
  deleteTodo: () => null,
});

export const useTodoContext = () => useContext(TodoContext);

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`https://todos.appsquare.io/todos`, {
        headers: {
          Authorization: "Bearer charles-token",
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json-patch+json",
          withCredentials: true,
        },
      });
      setTodos(response.data.todos);
    }
    fetchData();
  }, []);

  const addTodo = async (newTodo: InsertTodo) => {
    const response = await axios.post(
      `https://todos.appsquare.io/todos`,
      newTodo,
      {
        headers: {
          Authorization: "Bearer charles-token",
          accept: "text/plain",
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json-patch+json",
          withCredentials: true,
        },
      },
    );
    if (response) {
      setTodos((prevTodos) => [...prevTodos, response.data.todo[0]]);
    } else {
      console.error("Failed to add todo");
    }
  };

  const updateTodo = async (updatedTodo: Todo) => {
    const payload = {
      completed: updatedTodo.completed,
      title: updatedTodo.title,
    };

    const response = await axios.patch(
      `https://todos.appsquare.io/todos/${updatedTodo.id}`,
      payload,
      {
        headers: {
          Authorization: "Bearer charles-token",
          accept: "text/plain",
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json-patch+json",
          withCredentials: true,
        },
      },
    );
    if (response) {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === response.data.todo.id
            ? { ...todo, ...updatedTodo }
            : todo,
        ),
      );
    } else {
      console.error("Failed to edit todo");
    }
  };

  const deleteTodo = async (id: number) => {
    const response = await axios.delete(
      `https://todos.appsquare.io/todos/${id}`,
      {
        headers: {
          Authorization: "Bearer charles-token",
          accept: "text/plain",
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json-patch+json",
          withCredentials: true,
        },
      },
    );
    if (response) {
      setTodos((prevTodos) =>
        prevTodos.filter((todo) => todo.id !== response.data.todo.id),
      );
    } else {
      console.error("Failed to delete todo");
    }
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        updateTodo,
        deleteTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
