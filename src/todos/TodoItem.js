import request from "../services/request";
import React, { useState } from "react";
import Checkbox from "../partials/Checkbox";
import "../styles/TodoItem.css";
import Loader from "react-loader-spinner";
import todoActions from "./TodoActions";
import TodoService from "../services/todo";
import Errors from "../partials/Errors";

const priorities = {
  0: "low",
  1: "medium",
  2: "high",
};

function TodoItem({ todo, dispatch }) {
  const [confirm, setConfirm] = useState(false);
  const [errors, setErrors] = useState([]);

  async function handleCheck(event) {
    dispatch(todoActions.setLoading(todo));
    const { updatedTodo, errors } = await TodoService.update({ ...todo, is_completed: event.target.checked });
    setErrors(errors);
    dispatch(todoActions.update(updatedTodo));
  }

  async function handleDelete(event) {
    await request.delete(`/todos/${todo.id}`);
    dispatch(todoActions.remove(todo));
  }

  return (
    <div className="item d-flex flex-row w-100">
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
      <div className="w-100">
        <div className="d-flex flex-row w-100">
          <div className="mr-auto">
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
          </div>
          <div className="align-self-center">
            <span className="mr-4 action-button">
              <i className="fas fa-edit mr-2 h5"></i>
            </span>
            <span
              className="mr-4 action-button"
              onClick={() => setConfirm((state) => !state)}
            >
              <i className="fas fa-trash-alt mr-2 h5"></i>
            </span>
            {confirm && (
              <span className="confirm">
                <span onClick={handleDelete}>Confirm</span>
              </span>
            )}
          </div>
        </div>
        <div>
          <small>{todo.description}</small>
        </div>
        <Errors errors={errors} />
      </div>
    </div>
  );
}

export default TodoItem;
