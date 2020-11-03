import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Form/Button";
import Field from "../components/Form/Field";
import Select from "../components/Form/Select";
import api from "../services/api";

const InvoicePage = ({ history, match }) => {
  const entity = "invoices";
  const entityCustomers = "customers";

  const id = match.params.id;
  const isEditing = !isNaN(+id);

  const invoiceState = {
    amount: "",
    status: "SENT",
    customer: "",
  };

  const errorsState = {
    amount: "",
    status: "",
    customer: "",
  };

  const [invoice, setInvoice] = useState({ ...invoiceState });
  const [errors, setErrors] = useState({ ...errorsState });
  const [customers, setCustomers] = useState([]);

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setInvoice({ ...invoice, [name]: value });
  };

  useEffect(() => {
    if (isEditing) {
      api.get(entity, id).then((response) => {
        const { amount, status, customer } = response;
        setInvoice({ amount, status, customer: customer.id });
      });
    }

    api
      .fetch(entityCustomers)
      .then((response) => {
        setCustomers(response);
        if (!isEditing && !invoice.customer) {
          setInvoice({ ...invoice, customer: response[0] && response[0].id });
        }
      })
      .catch((error) => {});
  }, [id, isEditing]);

  const handleSubmit = (event) => {
    event.preventDefault();

    let apiResponse;

    const _invoice = {
      ...invoice,
      customer: `/api/customers/${invoice.customer}`,
    };

    if (isEditing) {
      apiResponse = api.put(entity, id, _invoice);
    } else {
      apiResponse = api.post(entity, _invoice);
    }

    apiResponse
      .then((response) => {
        setInvoice({ ...invoiceState });
        setErrors({ ...errorsState });
        history.push("/invoices");
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
      <h1>{isEditing ? "Modification de facture" : "Création de facture"}</h1>
      <form>
        <Field
          name="amount"
          label="Montant"
          type="number"
          error={errors.amount}
          value={invoice.amount}
          onChange={handleChange}
        />
        <Select
          name="customer"
          label="Client"
          error={errors.customer}
          value={invoice.customer}
          onChange={handleChange}
        >
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.firstName} {customer.lastName}
            </option>
          ))}
        </Select>
        <Select
          name="status"
          label="Status"
          error={errors.status}
          value={invoice.status}
          onChange={handleChange}
        >
          <option value="PAID">Payé</option>
          <option value="SENT">Envoyé</option>
          <option value="CANCELLED">Annulé</option>
        </Select>
        <div className="form-group">
          <Button onClick={handleSubmit} />
          <Link to="/invoices" className="btn btn-link">
            Retour à la liste
          </Link>
        </div>
      </form>
    </>
  );
};

export default InvoicePage;
