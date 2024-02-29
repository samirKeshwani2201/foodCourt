import React from "react";

const Pagination = ({
  postsPerPage,
  totalPosts,
  paginate,
  currentPage, 
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className="pagination">
        <li onClick={() => paginate(currentPage - 1)}>Prev</li>
        <li>
          {currentPage} of {Math.ceil(totalPosts / postsPerPage)}
        </li>
        <li onClick={() => paginate(currentPage + 1)}>Next</li>
      </ul>
    </nav>
  );
};

export default Pagination;
