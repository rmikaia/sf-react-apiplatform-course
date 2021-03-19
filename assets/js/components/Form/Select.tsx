import React from "react";

const Select: React.FC<{
  name: string;
  label: string;
  value: string;
  onChange: (event: { currentTarget: HTMLSelectElement }) => void;
  children: any;
  error?: string;
}> = ({ name, label, value, onChange, children, error = "" }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select
        name={name}
        id={name}
        className={"form-control" + (error && " is-invalid")}
        value={value}
        onChange={onChange}
      >
        {children}
      </select>
      {error && <p className="invalid-feedback">{error}</p>}
    </div>
  );
};

export default Select;
