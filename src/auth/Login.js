import React, { useState } from "react";
import { Container, Card } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import useAuth from "./AuthHook";
import { ROUTES } from "../constants";
import useFormFields from "../partials/FormFieldsHook";
import Form from "../partials/Form";

function Login() {
  const formFields = useFormFields({
    email: { required: true },
    password: { required: true, type: "password" },
  });

  const [status, setStatus] = useState({ done: false, errors: null });

  const auth = useAuth();

  async function login(event) {
    event.preventDefault();
    if (!formFields.validateFields()) {
      return;
    }
    const { email, password } = formFields.data;
    const status = await auth.login(email, password);
    setStatus(status);
  }

  if (status.done && !status.errors) {
    return <Redirect to={ROUTES.HOME} />;
  }

  return (
    <Container>
      <Card className="mx-auto my-3" style={{ maxWidth: "45rem" }}>
        <Card.Body>
          <h1 className="mb-4 text-center">Sign in</h1>
          <div className="text-center mb-2">
            Don't have an accout?{" "}
            <Link to={ROUTES.AUTH.REGISTER}>Create account.</Link>
          </div>
          <div className="text-center mb-4">
            <Link to={ROUTES.AUTH.FORGOT}>Forgot your password?</Link>
          </div>
          <Form
            formFields={formFields.fields}
            changeHandlers={formFields.changeHandlers}
            errors={status.errors}
            formName="login"
            onSubmit={login}
          />
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Login;
