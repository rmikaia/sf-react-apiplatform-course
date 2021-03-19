import React from "react";
import { InputType } from "../../types/components";

const Field: React.FC<{
  label: string;
  name: string;
  onChange: (event: { currentTarget: HTMLInputElement }) => void;
  value: string;
  error?: string;
  placeholder?: string;
  type?: InputType;
}> = ({
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
