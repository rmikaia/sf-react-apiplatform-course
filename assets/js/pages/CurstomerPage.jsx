import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../components/Form/Button";
import Field from "../components/Form/Field";
import FormLoader from "../components/Loaders/FormLoader";
import ROUTES from "../constantes/routes";
import api from "../services/api";
import {
  getCreateSuccess,
  getEditSuccess,
  getGenericError,
} from "../services/notification";

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
  const [loading, setLoading] = useState(false);

  /** @param {{currentTarget: HTMLInputElement}} args */
  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setCustomer({ ...customer, [name]: value });
  };

  useEffect(() => {
    if (isEditing) {
      setLoading(true);

      api
        .get(entity, id)
        .then((response) => {
          const { firstName, lastName, email, company } = response;
          setCustomer({ firstName, lastName, email, company });
          setLoading(false);
        })
        .catch(() => toast.error(getGenericError()));
    }
  }, [id, isEditing]);

  /** @param {React.MouseEvent} event */
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

        const subject = "Le client";
        toast.success(
          isEditing ? getEditSuccess(subject) : getCreateSuccess(subject)
        );

        history.push(ROUTES.CUSTOMERS);
      })
      .catch((error) => {
        const violations = error.response.data.violations;

        toast.error(getGenericError());

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
      {!loading && (
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
            <Link to={ROUTES.CUSTOMERS} className="btn btn-link">
              Retour à la liste
            </Link>
          </div>
        </form>
      )}
      {loading && <FormLoader />}
    </>
  );
};

export default CustomerPage;
