import React, { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import FormInput from "../partials/FormInput";
import useAuth from "./AuthHook";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isCompleted, setCompleted] = useState(false);
  const [isValidated, setValidated] = useState(false);
  const [error, setError] = useState(null);

  const auth = useAuth();

  async function login(event) {
    event.preventDefault();
    setValidated(true);
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      return;
    }

    try {
      await auth.login(email, password);
      setCompleted(true);
    } catch (e) {
      setError(e.response.data.error);
    }
  }

  if (isCompleted) {
    return <Redirect to="/" />;
  }

  return (
    <Container>
      <Card className="mx-auto my-3" style={{ maxWidth: "45rem" }}>
        <Card.Body>
          <Form noValidate validated={isValidated} onSubmit={login}>
            <h1 className="mb-4 text-center">Sign in</h1>
            <div className="text-center mb-4">
              Don't have an accout? <Link to="/register">Create account.</Link>
            </div>
            <FormInput
              formName="login"
              name="email"
              type="email"
              state={[email, setEmail]}
              required
            />
            <FormInput
              formName="login"
              name="password"
              type="password"
              state={[password, setPassword]}
              required
            />
            {error && (
              <div className="text-center text-danger mb-4">{error}</div>
            )}
            <div className="text-center mt-5 mb-3 ">
              <Link to="/auth/forgot" className="mr-3">
                Forgot password?
              </Link>
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

export default Login;
