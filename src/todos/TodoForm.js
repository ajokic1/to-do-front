import React, { useState, useEffect } from "react";
import { Container, Card } from "react-bootstrap";
import { Redirect, useRouteMatch } from "react-router-dom";
import TodoService from "../services/todo";
import { ROUTES } from "../constants";
import useFormFields from "../partials/FormFieldsHook";
import Form from "../partials/Form";

function TodoForm() {
  const formFields = useFormFields({
    title: { required: true },
    description: { rows: 6 },
    priority: {
      values: [
        { value: 0, caption: "Low" },
        { value: 1, caption: "Medium" },
        { value: 2, caption: "High" },
      ],
    },
  });

  const [status, setStatus] = useState({ done: false, errors: null });
  const match = useRouteMatch();

  useEffect(() => {
    (async () => {
      const { todo } = await TodoService.get(match.params.id);
      formFields.setFieldValues({
        title: todo.title,
        description: todo.description,
        priority: todo.priority,
      });
    })();
  }, [match.params.id]);

  async function submit(event) {
    event.preventDefault();
    if (!formFields.validateFields()) {
      return;
    }
    const action = match.params.id ? TodoService.update : TodoService.create;
    const status = await action({ ...formFields.data, id: match.params.id });
    setStatus(status);
  }

  if (status.done && status.errors.length === 0) {
    return <Redirect to={ROUTES.HOME} />;
  }

  return (
    <Container>
      <Card className="mx-auto my-3" style={{ maxWidth: "45rem" }}>
        <Card.Body>
          <h1 className="mb-4 text-center">
            {match.params.id ? "Edit to-do" : "Create to-do"}
          </h1>
          <Form
            formFields={formFields.fields}
            changeHandlers={formFields.changeHandlers}
            errors={status.errors}
            formName="todo"
            onSubmit={submit}
          />
        </Card.Body>
      </Card>
    </Container>
  );
}

export default TodoForm;
