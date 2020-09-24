import React from "react";
import { Form } from "react-bootstrap";
import Errors from "./Errors";

function FormInput({
  formName,
  name,
  type = "text",
  className = "",
  value,
  values,
  errors,
  onChange,
  rows,
  ...rest
}) {
  const options = values
    ? values.map((value) => (
        <option key={value.value} value={value.value}>{value.caption}</option>
      ))
    : null;

  let as = "input";
  if (values) {
    as = "select";
  }
  if (rows > 1) {
    as = "textarea";
  }

  return (
    <Form.Group
      className={"mb-4 " + (errors.size > 0 && "error ") + className}
      controlId={formName.camelize() + name.camelize()}
    >
      <Form.Label>{name.humanize().capitalize()}</Form.Label>
      <Form.Control
        as={as}
        rows={rows}
        type={type}
        placeholder={`Enter ${name.humanize().toLowerCase()}`}
        name={name}
        value={value}
        isInvalid={errors.length}
        onChange={onChange}
        {...rest}
      >
        {options}
      </Form.Control>
      <small>
        <Errors errors={errors} />
      </small>
    </Form.Group>
  );
}

export default FormInput;
