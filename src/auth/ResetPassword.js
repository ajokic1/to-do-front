import React, { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { Redirect, useRouteMatch } from "react-router-dom";
import FormInput from "../partials/FormInput";
import AuthService from "../services/auth";
import Errors from "../partials/Errors";
import { ROUTES } from "../constants";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [status, setStatus] = useState({ done: false, errors: null });
  const [isValidated, setValidated] = useState(false);
  const match = useRouteMatch();

  function handlePasswordConfirmationChange(event) {
    setPasswordConfirmation(event.target.value);
    if (event.target.value !== password) {
      event.target.setCustomValidity("Passwords do not match.");
    } else {
      event.target.setCustomValidity("");
    }
  }

  async function reset(event) {
    event.preventDefault();
    setValidated(true);
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      return;
    }

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
          <Form noValidate validated={isValidated} onSubmit={reset}>
            <h1 className="mb-4 text-center">Forgot password</h1>
            <div className="text-center mb-4">
              Enter your e-mail address below and you will receive a link to
              reset your password.
            </div>
            <FormInput
              formName="reset"
              name="email"
              type="email"
              state={[email, setEmail]}
              required
            />
            <FormInput
              formName="reset"
              name="password"
              type="password"
              state={[password, setPassword]}
              required
            />
            <FormInput
              formName="reset"
              name="password_confirmation"
              type="password"
              state={[passwordConfirmation, setPasswordConfirmation]}
              onChange={handlePasswordConfirmationChange}
              invalidMessage="Passwords do not match."
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

export default ResetPassword;
