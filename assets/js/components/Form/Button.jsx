import React from "react";

const Button = ({
  onClick,
  type = "submit",
  status = "success",
  text = "Valider",
}) => (
  <button type={type} className={`btn btn-${status}`} onClick={onClick}>
    {text}
  </button>
);

export default Button;
