import React from "react";

const Pagination: React.FC<{
  currentPage: number;
  handlePageChange: (currentPage: number) => void;
  itemsPerPage: number;
  totalItems: number;
}> & {
  getData: <T extends {}>(
    items: T[],
    currentPage: number,
    itemsPerPage: number
  ) => T[];
} = ({ totalItems, itemsPerPage, currentPage, handlePageChange }) => {
  const pagesCount = Math.ceil(totalItems / itemsPerPage);
  const pages = [];

  for (let index = 1; index <= pagesCount; index++) {
    pages.push(index);
  }

  return (
    <div>
      <ul className="pagination pagination-sm">
        <li className={currentPage === 1 ? "page-item disabled" : "page-item"}>
          <button
            className="page-link"
            onClick={() => handlePageChange(currentPage - 1)}
          >
            &laquo;
          </button>
        </li>
        {pages.map((page) => {
          return (
            <li
              key={page}
              className={
                page === currentPage ? "page-item active" : "page-item"
              }
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            </li>
          );
        })}

        <li
          className={
            currentPage === pagesCount ? "page-item disabled" : "page-item"
          }
        >
          <a
            className="page-link"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            &raquo;
          </a>
        </li>
      </ul>
    </div>
  );
};

Pagination.getData = (items, currentPage, itemsPerPage) => {
  const start = currentPage * itemsPerPage - itemsPerPage;
  return items.slice(start, start + itemsPerPage);
};

export default Pagination;
