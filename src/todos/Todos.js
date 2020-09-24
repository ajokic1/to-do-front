import React, { useReducer, useState, useEffect } from "react";
import useAuth from "../auth/AuthHook";
import TodoList from "./TodoList";
import request from "../services/request";
import todoReducer from "./TodoReducers";
import todoActions from "./TodoActions";

function Todos() {
  const [todos, dispatch] = useReducer(todoReducer, {});
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      if (!user) {
        return;
      }
      try {
        const response = await request.get("/todos");
        dispatch(todoActions.addList(response.data));
      } catch (e) {
        if(e.response && e.response.data) {
          console.log(e.response.data.error);
          setError(e.response.data.error);
        }
        console.error(e.message);
      }
    })();
  }, [user]);

  return (
    <div className="mt-3 h-100">
      {error && <div className="text-center my-3 text-danger">{error}</div>}
      <TodoList todos={Object.values(todos)} dispatch={dispatch} />
    </div>
  );
}

export default Todos;
