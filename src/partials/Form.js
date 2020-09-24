import React from "react";
import { Form as BootstrapForm, Button } from "react-bootstrap";
import FormInput from "./FormInput";
import Errors from "./Errors";

function Form({
  formFields,
  errors,
  formName,
  changeHandlers,
  buttonText = "Submit",
  onSubmit,
}) {
  const inputs = Object.keys(formFields).map((formFieldName) => {
    const formField = formFields[formFieldName];
    return (
      <FormInput
        formName={formName}
        key={formFieldName}
        name={formFieldName}
        value={formField.value}
        errors={formField.errors}
        onChange={changeHandlers[formFieldName]}
        required={formField.required}
        type={formField.type}
        values={formField.values}
        rows={formField.rows}
      />
    );
  });

  return (
    <BootstrapForm noValidate onSubmit={onSubmit}>
      {inputs}
      <Errors errors={errors} />
      <Button
        className="mt-5 mb-3 d-block mx-auto px-4"
        variant="primary"
        type="submit"
      >
        {buttonText}
      </Button>
    </BootstrapForm>
  );
}

export default Form;
