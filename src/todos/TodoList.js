import React from "react";
import { Container } from "react-bootstrap";
import CreateTodoButton from "./CreateTodoButton";
import TodoItem from "./TodoItem";

function TodoList({ todos, dispatch }) {
  const todoCards = todos
    .sort((first, second) => first.priority < second.priority)
    .map((todo) => <TodoItem key={todo.id} todo={todo} dispatch={dispatch} />);

  return (
    <Container>
      <CreateTodoButton />
      {todoCards}
    </Container>
  );
}

export default TodoList;
