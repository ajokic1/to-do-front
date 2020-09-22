import React, { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import FormInput from "../partials/FormInput";
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const [isCompleted, setCompleted] = useState(false);
  const [isValidated, setValidated] = useState(false);
  const [error, setError] = useState(null);

  async function forgot(event) {
    event.preventDefault();
    setValidated(true);
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      return;
    }

    try {
      await axios.post("/auth/forgot", { email });
      setCompleted(true);
    } catch (e) {
      setError(e.response.data.message);
    }
  }

  if (isCompleted) {
    return <Redirect to="/" />;
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
            {error && (
              <div className="text-center text-danger mb-4">{error}</div>
            )}
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
