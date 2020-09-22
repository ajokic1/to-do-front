import React from "react";
import { Form } from "react-bootstrap";

function FormInput({
  formName,
  name,
  type = "text",
  className = "",
  state,
  invalidMessage,
  onChange,
  ...rest
}) {
  const [value, setter] = state;

  function handleChange(event) {
    if(onChange) {
      onChange(event);
    } else {
      setter(event.target.value);
    }
  }

  return (
    <Form.Group
      className={"mb-4 " + className}
      controlId={formName.camelize() + name.camelize()}
    >
      <Form.Label>{name.humanize().capitalize()}</Form.Label>
      <Form.Control
        type={type}
        placeholder={`Enter ${name.humanize().toLowerCase()}`}
        name={name}
        value={value}
        onChange={handleChange}
        {...rest}
      />
      <Form.Control.Feedback type="invalid" className="position-relative">
        {invalidMessage
          ? invalidMessage
          : `Please enter a valid ${name.humanize().toLowerCase()}.`}
      </Form.Control.Feedback>
    </Form.Group>
  );
}

export default FormInput;
