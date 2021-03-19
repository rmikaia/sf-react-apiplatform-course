import axios from "axios";
import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import { Customer } from "../types/customer";

const CurstomersPaginationByApiPage = () => {
  const itemsPerPage = 20;
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    console.log(currentPage, itemsPerPage);
    axios
      .get(
        `http://localhost:8000/api/customers?pagination=true&itemsPerPage=${itemsPerPage}&page=${currentPage}`
      )
      .then((response) => {
        setCustomers(response.data["hydra:member"]);
        setTotalItems(response.data["hydra:totalItems"]);
      })
      .catch((error) => console.log(error.response));
  }, [currentPage, itemsPerPage]);

  const handleDelete = (customerId: number) => {
    const oldCustomers = [...customers];
    setCustomers(customers.filter((customer) => customer.id !== customerId));
    axios
      .delete(`http://localhost:8000/api/customers/${customerId}`)
      .catch(() => setCustomers(oldCustomers));
  };

  const handlePageChange = (currentPage: number) => {
    setCurrentPage(currentPage);
  };

  const paginatedCustomers = Pagination.getData(
    customers,
    currentPage,
    itemsPerPage
  );

  return (
    <>
      <h1>Liste des clients (Pagination api)</h1>
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
          {customers.length === 0 && (
            <tr>
              <td>Chargement...</td>
            </tr>
          )}
          {customers.map((customer) => (
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
      <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
    </>
  );
};

export default CurstomersPaginationByApiPage;
