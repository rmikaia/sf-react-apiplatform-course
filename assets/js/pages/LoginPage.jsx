import React, { useContext, useState } from "react";
import Button from "../components/Form/Button";
import Field from "../components/Form/Field";
import AuthContext from "../contexts/AuthContext";
import api from "../services/api";

const LoginPage = ({ history }) => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    api
      .auth(credentials)
      .then(() => {
        setError("");
        setIsAuthenticated(true);
        console.log(history);
        history.replace("/customers");
        console.log(history);
      })
      .catch((error) => {
        console.log(error);
        setError("Votre login ou mot de passe est erroné");
      });
  };

  return (
    <>
      <h1>Connexion</h1>
      <form>
        <Field
          type="email"
          label="Adresse email"
          name="username"
          value={credentials.username}
          error={error}
          onChange={handleChange}
        />
        <Field
          type="password"
          label="Mot de passe"
          name="password"
          value={credentials.password}
          onChange={handleChange}
        />
        <div className="form-group">
          <Button onClick={handleSubmit} />
        </div>
      </form>
    </>
  );
};

export default LoginPage;
