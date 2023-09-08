import { TodoProvider } from "./context/todo.context";
import TodoList from "./components/todoList";

const App = () => {
  return (
    <TodoProvider>
      <TodoList />
    </TodoProvider>
  );
};

export default App;
