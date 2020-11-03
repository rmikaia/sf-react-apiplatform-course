import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Form/Button";
import Field from "../components/Form/Field";
import api from "../services/api";

const CustomerPage = ({ history, match }) => {
  const entity = "customers";
  const id = match.params.id;
  const isEditing = !isNaN(+id);

  const customerState = {
    firstName: "",
    lastName: "",
    email: "",
    company: "",
  };

  const errorsState = {
    firstName: "",
    lastName: "",
    email: "",
    company: "",
  };

  const [customer, setCustomer] = useState({ ...customerState });
  const [errors, setErrors] = useState({ ...errorsState });

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setCustomer({ ...customer, [name]: value });
  };

  useEffect(() => {
    if (isEditing) {
      api.get(entity, id).then((response) => {
        const { firstName, lastName, email, company } = response;
        setCustomer({ firstName, lastName, email, company });
      });
    }
  }, [id, isEditing]);

  const handleSubmit = (event) => {
    event.preventDefault();

    let apiResponse;

    if (isEditing) {
      apiResponse = api.put(entity, id, customer);
    } else {
      apiResponse = api.post(entity, customer);
    }

    apiResponse
      .then((response) => {
        setCustomer({ ...customerState });
        setErrors({ ...errorsState });
        history.push("/customers");
      })
      .catch((error) => {
        const violations = error.response.data.violations;

        if (violations) {
          let apiErrors = { ...errorsState };

          violations.forEach(({ propertyPath, message }) => {
            apiErrors = { ...apiErrors, [propertyPath]: message };
          });

          setErrors(apiErrors);
        }
      });
  };

  return (
    <>
      <h1>{isEditing ? "Modification de client" : "Création de client"}</h1>
      <form>
        <Field
          name="firstName"
          label="Prénom"
          error={errors.firstName}
          value={customer.firstName}
          onChange={handleChange}
        />
        <Field
          name="lastName"
          label="Nom"
          error={errors.lastName}
          value={customer.lastName}
          onChange={handleChange}
        />
        <Field
          name="email"
          label="Email"
          error={errors.email}
          value={customer.email}
          onChange={handleChange}
          type="email"
        />
        <Field
          name="company"
          label="Entreprise"
          error={errors.company}
          value={customer.company}
          onChange={handleChange}
        />
        <div className="form-group">
          <Button onClick={handleSubmit} />
          <Link to="/customers" className="btn btn-link">
            Retour à la liste
          </Link>
        </div>
      </form>
    </>
  );
};

export default CustomerPage;
