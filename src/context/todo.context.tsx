import React, { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../helpers/axiosInstance";

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
    axiosInstance
      .get("/todos")
      .then((response) => {
        setTodos(response?.data.todos);
      })
      .catch((error) => {
        console.error("GET request error:", error);
      });
  }, []);

  const addTodo = async (newTodo: InsertTodo) => {
    axiosInstance
      .post("/todos", newTodo)
      .then((response) => {
        setTodos((prevTodos) => [...prevTodos, response.data.todo[0]]);
      })
      .catch((error) => {
        console.error("PUT request error:", error);
      });
  };

  const updateTodo = async (updatedTodo: Todo) => {
    const payload = {
      completed: updatedTodo.completed,
      title: updatedTodo.title,
    };

    axiosInstance
      .patch(`/todos/${updatedTodo.id}`, payload)
      .then((response) => {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === response.data.todo.id
              ? { ...todo, ...updatedTodo }
              : todo,
          ),
        );
      })
      .catch((error) => {
        console.error("PATCH request error:", error);
      });
  };

  const deleteTodo = async (id: number) => {
    axiosInstance
      .delete(`/todos/${id}`)
      .then((response) => {
        setTodos((prevTodos) =>
          prevTodos.filter((todo) => todo.id !== response.data.todo.id),
        );
      })
      .catch((error) => {
        console.error("DELETE request error:", error);
      });
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
