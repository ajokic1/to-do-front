import React from "react";
import "../styles/TodoItem.css";
import { Link } from "react-router-dom";
import { ROUTES } from "../constants";

function CreateTodoButton() {
  return (
    <Link to={ROUTES.TODOS.CREATE} className="text-dark">
      <div className="item add-todo text-center">
        <i className="fas fa-plus h1"></i>
        <div>Add todo</div>
      </div>
    </Link>
  );
}

export default CreateTodoButton;
