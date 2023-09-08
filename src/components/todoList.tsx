import { Controller, useForm } from "react-hook-form";
import { useTodoContext } from "../context/todo.context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

function TodoList() {
  const { todos, addTodo, updateTodo, deleteTodo } = useTodoContext();
  const { register, handleSubmit, control, reset } = useForm<InsertTodo>();

  const onSubmit = async (data: InsertTodo) => {
    const payload = {
      completed: false,
      title: data.title,
    };
    addTodo(payload);

    reset();
  };

  return (
    <div className="max-w-md mx-auto mt-4 p-4 bg-gray-100 rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">To-Do List</h1>
      <form>
        <div className="flex">
          <Controller
            name="title"
            control={control}
            render={() => (
              <input
                {...register("title")}
                className="w-full border rounded-l p-2"
                placeholder="Add a new task"
                type="text"
              />
            )}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-r"
            onClick={handleSubmit(onSubmit)}
          >
            Add
          </button>
        </div>
      </form>

      <ul className="mt-4">
        {todos.map((todo, idx) => (
          <li
            key={`todo-${idx}`}
            className={`flex justify-between items-center p-2 border-t `}
          >
            <span
              className={`${
                todo.completed ? "line-through text-gray-500" : ""
              }`}
              onClick={() =>
                updateTodo({
                  id: todo.id,
                  completed: !todo.completed,
                  title: todo.title,
                })
              }
            >
              {todo.completed ? (
                <FontAwesomeIcon
                  icon={faCheck}
                  className="text-green-500 mr-2 cursor-pointer"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faCheck}
                  className="text-gray-300 mr-2 cursor-pointer"
                />
              )}
              {todo.title}
            </span>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => deleteTodo(todo.id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
