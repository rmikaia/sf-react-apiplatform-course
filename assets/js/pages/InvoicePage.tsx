import React, { useEffect, useState } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../components/Form/Button";
import Field from "../components/Form/Field";
import Select from "../components/Form/Select";
import FormLoader from "../components/Loaders/FormLoader";
import ROUTES from "../constantes/routes";
import api from "../services/api";
import {
  getCreateSuccess,
  getEditSuccess,
  getGenericError,
} from "../services/notification";
import { Customer } from "../types/customer";
import { Invoice, InvoiceState } from "../types/invoice";

const InvoicePage: React.FC<RouteComponentProps<{ id: string }>> = ({
  history,
  match,
}) => {
  const entity = "invoices";
  const entityCustomers = "customers";

  const id = match.params.id;
  const isEditing = !isNaN(+id);

  const invoiceState: Partial<InvoiceState> = {
    amount: "",
    status: "SENT",
    customer: "",
  };

  const errorsState: Partial<InvoiceState> = {
    amount: "",
    status: "",
    customer: "",
  };

  const [invoice, setInvoice] = useState({ ...invoiceState });
  const [errors, setErrors] = useState({ ...errorsState });
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChange = ({
    currentTarget,
  }: {
    currentTarget: HTMLInputElement | HTMLSelectElement;
  }) => {
    const { name, value } = currentTarget;
    setInvoice({ ...invoice, [name]: value });
  };

  useEffect(() => {
    if (isEditing) {
      setLoading(true);
      api
        .get(entity, id)
        .then((response) => {
          const { amount, status, customer } = response;
          setInvoice({ amount, status, customer: customer.id });
          setLoading(false);
        })
        .catch(() => toast.error(getGenericError()));
    }

    api
      .fetch(entityCustomers)
      .then((response) => {
        setCustomers(response);
        if (!isEditing && !invoice.customer) {
          setInvoice({ ...invoice, customer: response[0] && response[0].id });
        }
      })
      .catch(() => toast.error(getGenericError()));
  }, [id, isEditing]);

  const handleSubmit = (event: React.MouseEvent) => {
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
      .then(() => {
        setInvoice({ ...invoiceState });
        setErrors({ ...errorsState });

        const subject = "La facture";
        toast.success(
          isEditing ? getEditSuccess(subject) : getCreateSuccess(subject)
        );

        history.push(ROUTES.INVOICES);
      })
      .catch((error) => {
        const violations = error.response.data.violations;

        toast.error(getGenericError());

        if (violations) {
          let apiErrors = { ...errorsState };

          violations.forEach(
            ({
              propertyPath,
              message,
            }: {
              propertyPath: string;
              message: string;
            }) => {
              apiErrors = { ...apiErrors, [propertyPath]: message };
            }
          );

          setErrors(apiErrors);
        }
      });
  };

  return (
    <>
      <h1>{isEditing ? "Modification de facture" : "Création de facture"}</h1>
      {!loading && (
        <form>
          <Field
            name="amount"
            label="Montant"
            type="number"
            error={errors.amount}
            value={invoice.amount!}
            onChange={handleChange}
          />
          <Select
            name="customer"
            label="Client"
            error={errors.customer}
            value={invoice.customer!}
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
            value={invoice.status!}
            onChange={handleChange}
          >
            <option value="PAID">Payé</option>
            <option value="SENT">Envoyé</option>
            <option value="CANCELLED">Annulé</option>
          </Select>
          <div className="form-group">
            <Button onClick={handleSubmit} />
            <Link to={ROUTES.INVOICES} className="btn btn-link">
              Retour à la liste
            </Link>
          </div>
        </form>
      )}
      {loading && <FormLoader />}
    </>
  );
};

export default InvoicePage;
