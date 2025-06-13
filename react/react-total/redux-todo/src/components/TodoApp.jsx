import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, toggleTodo, removeTodo } from "../reducers/TodoSlice";

const TodoApp = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  const handleAdd = (e) => {
    e.preventDefault();
    dispatch(addTodo(text));
    setText("");
  };

  return (
    <div>
      <h2>TodoList</h2>
      <form onSubmit={handleAdd}>
        <input
          type="text"
          value={text}
          name=""
          id=""
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={handleAdd}>추가</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li>
            <span
              className={`todo-item ${todo.completed ? "completed" : ""}`}
              onClick={() => dispatch(toggleTodo(todo.id))}
            >
              {todo.text}
            </span>
            <button onClick={() => dispatch(removeTodo(todo.id))}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
