import Axios from "axios";
import React from "react";
import Checkbox from "../partials/Checkbox";
import "../styles/TodoItem.css";
import Loader from "react-loader-spinner";

const priorities = {
  0: "low",
  1: "medium",
  2: "high",
};

function TodoItem({ todo, dispatch }) {
  async function handleCheck(event) {
    dispatch({
      type: "setLoading",
      payload: { id: todo.id },
    });
    let newTodo = { ...todo };
    newTodo.is_completed = event.target.checked;
    const response = await Axios.patch(`/todos/${todo.id}`, newTodo);
    dispatch({
      type: "update",
      payload: response.data.data,
    });
  }

  return (
    <div className="item d-flex flex-row">
      <div className="mt-2 ml-2 mr-4" style={{ flex: "0 0 3rem" }}>
        {todo.isLoading ? (
          <Loader
            type="Puff"
            color="green"
            height={40}
            width={40}
            style={{ position: "relative", bottom: "3px", right: "5px" }}
          />
        ) : (
          <Checkbox checked={todo.is_completed} onChange={handleCheck} />
        )}
      </div>
      <div>
        <div>
          <small>
            Priority:&nbsp;
            <span className={"priority-" + priorities[todo.priority]}>
              {priorities[todo.priority]}
            </span>
          </small>
        </div>
        <div>
          <strong>{todo.title}</strong>
        </div>
        <div>
          <small>{todo.description}</small>
        </div>
      </div>
    </div>
  );
}

export default TodoItem;
