import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import api from "../services/api";

const CustomersPage = () => {
  const entity = "customers";
  const itemsPerPage = 10;
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api
      .fetch(entity)
      .then((fetchedCustomers) => setCustomers(fetchedCustomers))
      .catch((error) => console.log(error.response));
  }, []);

  const handleDelete = (customerId) => {
    const oldCustomers = [...customers];

    setCustomers(customers.filter((customer) => customer.id !== customerId));
    api.delete(entity, customerId).catch(() => setCustomers(oldCustomers));
  };

  const handlePageChange = (currentPage) => {
    setCurrentPage(currentPage);
  };

  const handleSearch = ({ target }) => {
    setSearch(target.value.toLowerCase());
    setCurrentPage(1);
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.firstName.toLowerCase().includes(search) ||
      customer.lastName.toLowerCase().includes(search) ||
      customer.email.toLowerCase().includes(search) ||
      (customer.company && customer.company.toLowerCase().includes(search))
  );

  const paginatedCustomers = Pagination.getData(
    filteredCustomers,
    currentPage,
    itemsPerPage
  );

  return (
    <>
      <h1>Liste des clients</h1>
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
            <th>Client</th>
            <th>Email</th>
            <th>Entreprise</th>
            <th className="text-center">Facture</th>
            <th className="text-center">Montant total</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {paginatedCustomers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>
                <a href="#">
                  {customer.firstName} {customer.lastName}
                </a>
              </td>
              <td>{customer.email}</td>
              <td>{customer.company}</td>
              <td className="text-center">
                <button className="badge badge-primary">
                  {customer.invoices.length}
                </button>
              </td>
              <td className="text-center">
                {customer.totalAmount.toLocaleString()} €
              </td>
              <td>
                <button
                  onClick={() => handleDelete(customer.id)}
                  className="btn btn-sm btn-danger"
                  disabled={customer.invoices.length > 0 ? true : false}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {itemsPerPage < filteredCustomers.length && (
        <Pagination
          totalItems={filteredCustomers.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      )}
    </>
  );
};

export default CustomersPage;
