import React, { useContext, useState } from "react";
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
        <div className="form-group">
          <label htmlFor="username">Email</label>
          <input
            type="email"
            name="username"
            id="username"
            placeholder="Saisir votre adresse email"
            className={"form-control" + (error && " is-invalid")}
            value={credentials.username}
            onChange={handleChange}
          />
          {error && <p className="invalid-feedback">{error}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Saisir votre mot de passe"
            className="form-control"
            value={credentials.password}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <button
            type="submit"
            className="btn btn-success"
            onClick={handleSubmit}
          >
            Valider
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginPage;
