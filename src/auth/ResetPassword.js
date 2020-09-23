import React, { useState } from "react";
import { Container, Card } from "react-bootstrap";
import { Redirect, useRouteMatch } from "react-router-dom";
import AuthService from "../services/auth";
import { ROUTES } from "../constants";
import useFormFields from "../partials/FormFieldsHook";
import Form from "../partials/Form";

function ResetPassword() {
  const formFields = useFormFields({
    email: { required: true },
    password: { required: true, type: "password" },
    password_confirmation: {
      required: true,
      equals: "password",
      type: "password",
    },
  });

  const [status, setStatus] = useState({ done: false, errors: null });
  const match = useRouteMatch();

  async function reset(event) {
    event.preventDefault();
    if (!formFields.validateFields()) {
      return;
    }
    const { email, password } = formFields.data;
    const status = await AuthService.resetPassword(
      email,
      password,
      match.params.token
    );
    setStatus(status);
  }

  if (status.done && !status.errors) {
    return <Redirect to={ROUTES.HOME} />;
  }

  return (
    <Container>
      <Card className="mx-auto" style={{ maxWidth: "45rem" }}>
        <Card.Body>
          <h1 className="mb-4 text-center">Forgot password</h1>
          <div className="text-center mb-4">
            Enter your e-mail address below and you will receive a link to reset
            your password.
          </div>
          <Form
            formFields={formFields.fields}
            changeHandlers={formFields.changeHandlers}
            errors={status.errors}
            formName="forgot_password"
            onSubmit={reset}
          />
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ResetPassword;
