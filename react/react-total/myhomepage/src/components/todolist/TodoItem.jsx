import { useContext } from "react";
import { TodoContext } from "../../context/TodoContext";

const TodoItem = ({ todo }) => {
  const { toggleTodo, deleteTodo } = useContext(TodoContext);
  return (
    <li>
      <span
        className={todo.check ? "line" : ""}
        onClick={() => toggleTodo(todo.id)}
      >
        {todo.text}
      </span>
      <button onClick={() => deleteTodo(todo.id)}>X</button>
    </li>
  );
};

export default TodoItem;
