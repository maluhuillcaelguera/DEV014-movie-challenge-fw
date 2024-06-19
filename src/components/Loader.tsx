import React from 'react';
import './Loader.css'; // Asegúrate de crear este archivo de estilos

const Loader: React.FC = () => {
  return (
    <div className="loader">
      <div className="spinner"></div>
    </div>
  );
};

export default Loader;
