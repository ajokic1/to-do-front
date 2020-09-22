import React from "react";
import useTodo from "./TodoHook";
import TodoList from "./TodoList";

function Todos() {
  const { todos, dispatch, error } = useTodo();

  return (
    <div className="mt-3 h-100">
      {error && <div className="text-center my-3 text-danger">{error}</div>}
      <TodoList todos={todos} dispatch={dispatch} />
    </div>
  );
}

export default Todos;
