import "./Pagination.css";

function Pagination({ totalPages, currentPage, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="pagination">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`pagination__btn ${
            currentPage === page ? "pagination__btn--active" : ""
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
}

export default Pagination;