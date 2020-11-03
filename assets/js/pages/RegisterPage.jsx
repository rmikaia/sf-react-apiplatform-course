import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Form/Button";
import Field from "../components/Form/Field";
import api from "../services/api";

const RegisterPage = ({ history, match }) => {
  const entity = "users";

  const userState = {
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    passwordConfirm: "",
  };

  const errorsState = {
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    passwordConfirm: "",
  };

  const [user, setUser] = useState({ ...userState });
  const [errors, setErrors] = useState({ ...errorsState });

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let apiErrors = { ...errorsState };

    if (user.password !== user.passwordConfirm) {
      apiErrors.passwordConfirm =
        "Attention, votre mot de passe et sa confirmation ne sont pas conformes";
      setErrors(apiErrors);
      return;
    }

    api
      .post(entity, user)
      .then((response) => {
        setUser({ ...userState });
        setErrors({ ...errorsState });
        history.push("/login");
      })
      .catch((error) => {
        const violations = error.response.data.violations;

        if (violations) {
          violations.forEach(({ propertyPath, message }) => {
            apiErrors = { ...apiErrors, [propertyPath]: message };
          });

          setErrors(apiErrors);
        }
      });
  };

  return (
    <>
      <h1>Création de votre profil</h1>
      <form>
        <Field
          name="lastName"
          label="Nom"
          error={errors.lastName}
          value={user.lastName}
          onChange={handleChange}
        />
        <Field
          name="firstName"
          label="Prénom"
          error={errors.firstName}
          value={user.firstName}
          onChange={handleChange}
        />
        <Field
          name="email"
          label="Email"
          type="email"
          error={errors.email}
          value={user.email}
          onChange={handleChange}
        />
        <Field
          name="password"
          label="Mot de passe"
          type="password"
          error={errors.password}
          value={user.password}
          onChange={handleChange}
        />
        <Field
          name="passwordConfirm"
          label="Confirmation"
          type="password"
          error={errors.passwordConfirm}
          value={user.passwordConfirm}
          onChange={handleChange}
        />
        <div className="form-group">
          <Button onClick={handleSubmit} />
          <Link to="/login" className="btn btn-link">
            Vous avez déjà un compte
          </Link>
        </div>
      </form>
    </>
  );
};

export default RegisterPage;
