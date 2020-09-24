import React, { useReducer, useState, useEffect } from "react";
import useAuth from "../auth/AuthHook";
import TodoList from "./TodoList";
import todoReducer from "./TodoReducers";
import todoActions from "./TodoActions";
import TodoService from "../services/todo";
import Errors from "../partials/Errors";

function Todos() {
  const [todos, dispatch] = useReducer(todoReducer, {});
  const [errors, setErrors] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      const { todoList, errors } = await TodoService.loadList();
      setErrors(errors);
      dispatch(todoActions.addList(todoList));
    })();
  }, [user]);

  return (
    <div className="mt-3 h-100">
      <div className="text-center">
        <Errors errors={errors}/>
      </div>
      <TodoList todos={Object.values(todos)} dispatch={dispatch} />
    </div>
  );
}

export default Todos;
