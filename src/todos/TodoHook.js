import { useState, useReducer, useEffect } from "react";
import useAuth from "../auth/AuthHook";
import axios from "axios";

function updateTodo(state, action) {
  let todos = [...state];
  console.log(state);
  state.forEach((todo) => {
    if (todo.id === action.payload.id) {
      for (const key in todo) {
        todo[key] = action.payload[key];
      }
      todo.isLoading = false;
    }
  });
  return todos;
}

function setLoading(state, action) {
  let todos = [...state];
  state.forEach((todo) => {
    if (todo.id === action.payload.id) {
      todo.isLoading = true;
    }
  });
  return todos;
}

function todoReducer(state, action) {
  switch (action.type) {
    case "addList":
      return state.concat(action.payload);
    case "update":
      return updateTodo(state, action);
    case "setLoading":
      return setLoading(state, action);
    default:
      throw new Error("Invalid action.");
  }
}

function useTodo() {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      if (!user) {
        return;
      }
      try {
        const response = await axios("/todos");
        dispatch({
          type: "addList",
          payload: response.data,
        });
      } catch (e) {
        console.log(e.response.data.error);
        setError(e.response.data.error);
      }
    })();
  }, [user]);

  return {
    todos,
    dispatch,
    error,
  };
}

export default useTodo;
