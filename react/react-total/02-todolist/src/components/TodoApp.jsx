import { TodoProvider } from "../context/TodoContext";
import TodoCount from "./TodoCount";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

function TodoApp() {
  return (
    <TodoProvider>
      {/* 아래의 전체 내용이 children에 들어가는 것 */}
      <div className="todoApp">
        <h1>Todo List</h1>
        <TodoForm />
        <TodoList />
        <TodoCount />
      </div>
    </TodoProvider>
  );
}

export default TodoApp;
