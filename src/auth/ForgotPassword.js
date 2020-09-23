import React, { useState } from "react";
import { Container, Card } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth";
import { ROUTES } from "../constants";
import useFormFields from "../partials/FormFieldsHook";
import Form from "../partials/Form";

function ForgotPassword() {
  const formFields = useFormFields({
    email: { required: true },
  });

  const [status, setStatus] = useState({ done: false, errors: null });

  async function forgot(event) {
    event.preventDefault();
    if (!formFields.validateFields()) {
      return;
    }
    const { email } = formFields.data;
    const status = await AuthService.forgotPassword(email);
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
            onSubmit={forgot}
          />
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ForgotPassword;
