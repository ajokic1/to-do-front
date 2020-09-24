import React from "react";
import { Form } from "react-bootstrap";
import Errors from "./Errors";

function FormInput({
  formName,
  name,
  type = "text",
  className = "",
  value,
  errors,
  onChange,
  ...rest
}) {
  return (
    <Form.Group
      className={"mb-4 " + (errors.size > 0 && "error ") + className}
      controlId={formName.camelize() + name.camelize()}
    >
      <Form.Label>{name.humanize().capitalize()}</Form.Label>
      <Form.Control
        type={type}
        placeholder={`Enter ${name.humanize().toLowerCase()}`}
        name={name}
        value={value}
        isInvalid={errors.length}
        onChange={onChange}
        {...rest}
      />
      <small>
        <Errors errors={errors} />
      </small>
    </Form.Group>
  );
}

export default FormInput;
