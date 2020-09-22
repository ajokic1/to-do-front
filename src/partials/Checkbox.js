import React from "react";
import "../styles/Checkbox.css";

function Checkbox({ checked, onChange }) {
  return (
    <span className="checkbox-group">
      <input
        checked={checked}
        onChange={onChange}
        type="checkbox"
        id="custom-checkbox"
        className="custom-checkbox"
      />
      <span className="custom-checkbox-span" tabindex="0"></span>
    </span>
  );
}

export default Checkbox;
