import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

const PrivateRoute: React.FC<{
  path: string;
  component: React.FC<any>;
}> = ({ path, component }) => {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? (
    <Route path={path} component={component} />
  ) : (
    <Redirect to="/" />
  );
};

export default PrivateRoute;
