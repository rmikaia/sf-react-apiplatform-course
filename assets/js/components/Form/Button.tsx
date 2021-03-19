import React from "react";
import { ButtonType } from "../../types/components";

const Button: React.FC<{
  onClick: (event: React.MouseEvent) => void;
  status?: string;
  text?: string;
  type?: ButtonType;
}> = ({ onClick, status = "success", text = "Valider", type = "submit" }) => (
  <button type={type} className={`btn btn-${status}`} onClick={onClick}>
    {text}
  </button>
);

export default Button;
