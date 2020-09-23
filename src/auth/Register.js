import React, { useState } from "react";
import { Container, Card } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import AuthService from "../services/auth";
import { ROUTES } from "../constants";
import useFormFields from "../partials/FormFieldsHook";
import Form from "../partials/Form";

function Register() {
  const formFields = useFormFields({
    first_name: { required: true },
    last_name: { required: true },
    email: { required: true },
    password: { required: true, type: "password" },
    password_confirmation: {
      required: true,
      equals: "password",
      type: "password",
    },
  });

  const [status, setStatus] = useState({ done: false, errors: null });

  async function register(event) {
    event.preventDefault();
    if (!formFields.validateFields()) {
      return;
    }
    const status = await AuthService.register(formFields.data);
    setStatus(status);
  }

  if (status.done && !status.errors) {
    return <Redirect to={ROUTES.AUTH.LOGIN} />;
  }

  return (
    <Container>
      <Card className="mx-auto" style={{ maxWidth: "45rem" }}>
        <Card.Body>
          <h1 className="mb-4 text-center">Create account</h1>
          <div className="text-center mb-4">
            Already have an account?{" "}
            <Link to={ROUTES.AUTH.LOGIN}>Sign in.</Link>
          </div>
          <Form
            formFields={formFields.fields}
            changeHandlers={formFields.changeHandlers}
            errors={status.errors}
            formName="register"
            onSubmit={register}
          />
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Register;
