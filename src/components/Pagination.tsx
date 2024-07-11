// src/components/Pagination.tsx
import React from 'react';
import '../styles/Pagination.css'; // Asegúrate de importar el archivo CSS

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

  const handleFirstPageClick = () => {
    onSelectPage(1);
  };

  const handleLastPageClick = () => {
    onSelectPage(totalPages);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= 10; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`page-number ${i === currentPage ? 'active' : ''}`}
          onClick={() => onSelectPage(i)}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="pagination">
     
      <button className="pagination-button" onClick={handlePreviousClick} disabled={currentPage === 1}>
         Anterior
      </button>
      {renderPageNumbers()}
      
      <button className="pagination-button" onClick={handleNextClick} disabled={currentPage === totalPages}>
        Siguiente 
      </button>
      
    </div>
  );
};

export default Pagination;
