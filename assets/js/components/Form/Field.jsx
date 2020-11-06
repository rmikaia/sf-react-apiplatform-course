import React from "react";

/**
 * @param {{
 *   label: string,
 *   name: string,
 *   onChange: ({currentTarget: HTMLInputElement}) => void,
 *   value: string,
 *   error?: string,
 *   placeholder?: string,
 *   type?: InputType,
 * }} args
 */
const Field = ({
  label,
  name,
  onChange,
  value,
  error = "",
  placeholder = "",
  type = "text",
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder || label}
        className={"form-control" + (error && " is-invalid")}
        value={value}
        onChange={onChange}
      />
      {error && <p className="invalid-feedback">{error}</p>}
    </div>
  );
};

export default Field;
