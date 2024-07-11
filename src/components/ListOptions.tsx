import React from 'react';
import '../styles/ListOptions.css'; 

export interface Option {  // Asegúrate de exportar esta interfaz
  value: string;
  label: string;
}

export interface ListOptionsProps {  // Asegúrate de exportar esta interfaz
  options: Option[];
  selectedOption: Option | null;
  onChange: (option: Option) => void;
  onClear: () => void;
  placeholder: string; // Nueva propiedad
}

const ListOptions: React.FC<ListOptionsProps> = ({ options, selectedOption, onChange, onClear, placeholder }) => {
  return (
    <div className="list-options">
      <select 
        className="custom-select" // Añade esta clase para estilizar el selector
        value={selectedOption ? selectedOption.value : ''} 
        onChange={(e) => {
          const selectedValue = (e.target as HTMLSelectElement).value;  // Conversión de tipo aquí
          const selected = options.find(option => option.value === selectedValue);
          if (selected) {
            onChange(selected);
          }
        }}
      >
        <option value="" disabled>{placeholder}</option> {/* Usar el placeholder aquí */}
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {selectedOption && (
        <button className="clear-button" onClick={onClear}>
          X
        </button>
      )}
    </div>
  );
}

export default ListOptions;
