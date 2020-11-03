import React from "react";

const Field = ({
  name,
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
  error = "",
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
