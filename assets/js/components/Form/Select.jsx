import React from "react";

/**
 * @param {{
 *   name: string
 *   label: string,
 *   value: string,
 *   onChange: ({ currentTarget: HTMLSelectElement }) => void,
 *   children: any,
 *   error?: string,
 * }} args
 */
const Select = ({ name, label, value, onChange, children, error = "" }) => {
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
