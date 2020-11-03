import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination";
import api from "../services/api";
import { formatDate } from "../services/date";

const STATUS_CLASS = {
  PAID: "success",
  SENT: "primary",
  CANCELLED: "danger",
};

const STATUS_LABEL = {
  PAID: "Payée",
  SENT: "Envoyée",
  CANCELLED: "Annulée",
};

const InvoicesPage = () => {
  const entity = "invoices";
  const itemsPerPage = 10;

  const [invoices, setInvoices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api
      .fetch(entity)
      .then((fetchedInvoices) => setInvoices(fetchedInvoices))
      .catch((error) => console.log(error.response));
  }, []);

  const handleDelete = (invoiceId) => {
    const oldInvoices = [...invoices];

    setInvoices(invoices.filter((invoice) => invoice.id !== invoiceId));
    api.delete(entity, invoiceId).catch(() => setInvoices(oldInvoices));
  };

  const handlePageChange = (currentPage) => {
    setCurrentPage(currentPage);
  };

  const handleSearch = ({ target }) => {
    setSearch(target.value.toLowerCase());
    setCurrentPage(1);
  };

  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.customer.firstName.toLowerCase().includes(search) ||
      invoice.customer.lastName.toLowerCase().includes(search) ||
      invoice.amount.toString().startsWith(search) ||
      STATUS_LABEL[invoice.status].toLowerCase().includes(search.toLowerCase())
  );

  const paginatedInvoices = Pagination.getData(
    filteredInvoices,
    currentPage,
    itemsPerPage
  );

  return (
    <>
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <h1>Liste des factures</h1>
        <Link to="/invoices/new" className="btn btn-primary">
          Créer une facture
        </Link>
      </div>
      <input
        onChange={handleSearch}
        type="text"
        className="form-control"
        placeholder="Rechercher..."
      />
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Id.</th>
            <th>N°</th>
            <th>Client</th>
            <th>Envoyée le</th>
            <th>Statut</th>
            <th className="text-center">Montant</th>
            <th />
            <th />
          </tr>
        </thead>
        <tbody>
          {paginatedInvoices.map((invoice) => (
            <tr key={invoice.id}>
              <td>
                <Link to={`/invoices/${invoice.id}`}>{invoice.id}</Link>
              </td>
              <td>{invoice.chrono}</td>
              <td>
                <Link to={`/customers/${invoice.customer.id}`}>
                  {invoice.customer.firstName} {invoice.customer.lastName}
                </Link>
              </td>
              <td>{formatDate(invoice.sentAt)}</td>
              <td className="text-center">
                <button
                  className={`badge badge-${STATUS_CLASS[invoice.status]}`}
                >
                  {STATUS_LABEL[invoice.status]}
                </button>
              </td>
              <td className="text-center">
                {invoice.amount.toLocaleString()} €
              </td>
              <td>
                <Link
                  to={`/invoices/${invoice.id}`}
                  className="btn btn-sm btn-primary"
                >
                  Editer
                </Link>
              </td>
              <td>
                <button
                  onClick={() => handleDelete(invoice.id)}
                  className="btn btn-sm btn-danger"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {itemsPerPage < filteredInvoices.length && (
        <Pagination
          totalItems={filteredInvoices.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      )}
    </>
  );
};

export default InvoicesPage;
