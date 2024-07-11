import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import Pagination from '../components/Pagination'; // Ajusta la ruta de importación según tu proyecto


test('llama a onSelectPage con el número de página correcto al hacer clic en los botones anterior y siguiente', () => {
  const mockOnSelectPage = jest.fn();
  render(<Pagination currentPage={3} totalPages={10} onSelectPage={mockOnSelectPage} />);

  fireEvent.click(screen.getByText('2'));
  expect(mockOnSelectPage).toHaveBeenCalledWith(2);

  fireEvent.click(screen.getByText('4'));
  expect(mockOnSelectPage).toHaveBeenCalledWith(4); // Ajusta esto según la lógica de paginación esperada
});

  test('disables previous button on first page', () => {
    const mockOnSelectPage = jest.fn();
    const { getByText } = render(
      <Pagination currentPage={1} totalPages={3} onSelectPage={mockOnSelectPage} />
    );

    const previousButton = getByText('Anterior') as HTMLButtonElement;

    fireEvent.click(previousButton);
    expect(mockOnSelectPage).not.toHaveBeenCalled();

    expect(previousButton.disabled).toBe(true); // Verificar que el botón está deshabilitado
  });

  test('disables next button on last page', () => {
    const mockOnSelectPage = jest.fn();
    const { getByText } = render(
      <Pagination currentPage={3} totalPages={3} onSelectPage={mockOnSelectPage} />
    );

    const nextButton = getByText('Siguiente') as HTMLButtonElement;

    fireEvent.click(nextButton);
    expect(mockOnSelectPage).not.toHaveBeenCalled();

    expect(nextButton.disabled).toBe(true); // Verificar que el botón está deshabilitado
  });
});
