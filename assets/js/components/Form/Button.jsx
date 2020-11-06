import React from "react";

/**
 * @param {{
 *   onClick: (event: React.MouseEvent) => void;
 *   status?: ButtonStatus;
 *   text?: string;
 *   type?: ButtonType;
 * }} args
 */
const Button = ({
  onClick,
  status = "success",
  text = "Valider",
  type = "submit",
}) => (
  <button type={type} className={`btn btn-${status}`} onClick={onClick}>
    {text}
  </button>
);

export default Button;
