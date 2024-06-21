import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onSelectPage: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onSelectPage }) => {
  const handlePreviousClick = () => {
    if (currentPage > 1) {
      onSelectPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onSelectPage(currentPage + 1);
    }
  };

  return (
    <div className="pagination">
      <button onClick={handlePreviousClick} disabled={currentPage === 1}>
        Anterior
      </button>
      <span>Página {currentPage} de {totalPages}</span>
      <button onClick={handleNextClick} disabled={currentPage === totalPages}>
        Siguiente
      </button>
    </div>
  );
};

export default Pagination;
