import React, { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import FormInput from "../partials/FormInput";
import AuthService from "../services/auth";
import Errors from "../partials/Errors";
import { ROUTES } from "../constants";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const [status, setStatus] = useState({ done: false, errors: null });
  const [isValidated, setValidated] = useState(false);

  async function forgot(event) {
    event.preventDefault();
    setValidated(true);
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      return;
    }

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
          <Form noValidate validated={isValidated} onSubmit={forgot}>
            <h1 className="mb-4 text-center">Forgot password</h1>
            <div className="text-center mb-4">
              Enter your e-mail address below and you will receive a link to
              reset your password.
            </div>
            <FormInput
              formName="forgot"
              name="email"
              type="email"
              state={[email, setEmail]}
              required
            />
            <Errors errors={status.errors} />
            <div className="text-center mt-5 mb-3 ">
              <Button className="px-4" variant="primary" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ForgotPassword;
