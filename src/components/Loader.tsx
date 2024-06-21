import React from 'react';
import '../styles/Loader.css'; // Asegúrate de crear este archivo de estilos

const Loader: React.FC = () => {
  return (
    <div className="loader">
      <div className="spinner"></div>
    </div>
  );
};

export default Loader;
