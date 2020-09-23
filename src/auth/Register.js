import React, { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import FormInput from "../partials/FormInput";
import AuthService from "../services/auth";
import Errors from "../partials/Errors";
import { ROUTES } from "../constants";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [status, setStatus] = useState({ done: false, errors: null });
  const [isValidated, setValidated] = useState(false);

  function handlePasswordConfirmationChange(event) {
    setPasswordConfirmation(event.target.value);
    if (event.target.value !== password) {
      event.target.setCustomValidity("Passwords do not match.");
    } else {
      event.target.setCustomValidity("");
    }
  }

  async function register(event) {
    event.preventDefault();
    setValidated(true);
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      return;
    }

    const status = await AuthService.register({
      firstName,
      lastName,
      email,
      password,
    });
    setStatus(status);
  }

  if (status.done && !status.errors) {
    return <Redirect to={ROUTES.AUTH.LOGIN} />;
  }

  return (
    <Container>
      <Card className="mx-auto" style={{ maxWidth: "45rem" }}>
        <Card.Body>
          <Form noValidate validated={isValidated} onSubmit={register}>
            <h1 className="mb-4 text-center">Create account</h1>
            <div className="text-center mb-4">
              Already have an account? <Link to={ROUTES.AUTH.LOGIN}>Sign in.</Link>
            </div>
            <FormInput
              formName="register"
              name="first_name"
              state={[firstName, setFirstName]}
              required
            />
            <FormInput
              formName="register"
              name="last_name"
              state={[lastName, setLastName]}
              required
            />
            <FormInput
              formName="register"
              name="email"
              type="email"
              state={[email, setEmail]}
              required
            />
            <FormInput
              formName="register"
              name="password"
              type="password"
              state={[password, setPassword]}
              required
            />
            <FormInput
              formName="register"
              name="password_confirmation"
              type="password"
              state={[passwordConfirmation, setPasswordConfirmation]}
              onChange={handlePasswordConfirmationChange}
              invalidMessage="Passwords do not match."
              required
            />
            <Errors errors={status.errors} />
            <Button
              className="mt-5 mb-3 d-block mx-auto px-4"
              variant="primary"
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Register;
