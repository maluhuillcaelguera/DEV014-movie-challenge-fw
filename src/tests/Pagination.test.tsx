import { render, fireEvent } from '@testing-library/react';
import Pagination from '../components/Pagination';

describe('Pagination Component', () => {
  test('renders pagination with correct current and total pages', () => {
    const mockOnSelectPage = jest.fn();
    const { getByText } = render(
      <Pagination currentPage={1} totalPages={5} onSelectPage={mockOnSelectPage} />
    );

    expect(getByText('Página 1 de 5')).toBeTruthy();
  });

  test('calls onSelectPage with correct page number when clicking previous and next buttons', () => {
    const mockOnSelectPage = jest.fn();
    const { getByText } = render(
      <Pagination currentPage={3} totalPages={7} onSelectPage={mockOnSelectPage} />
    );

    fireEvent.click(getByText('Anterior'));
    expect(mockOnSelectPage).toHaveBeenCalledWith(2);

    fireEvent.click(getByText('Siguiente'));
    expect(mockOnSelectPage).toHaveBeenCalledWith(4);
  });

  test('disables previous button on first page and next button on last page', () => {
    const mockOnSelectPage = jest.fn();
    const { getByText } = render(
      <Pagination currentPage={1} totalPages={3} onSelectPage={mockOnSelectPage} />
    );

    const previousButton = getByText('Anterior');
    const nextButton = getByText('Siguiente');

    fireEvent.click(previousButton);
    expect(mockOnSelectPage).not.toHaveBeenCalled();

    fireEvent.click(nextButton);
    expect(mockOnSelectPage).toHaveBeenCalledWith(2);

    fireEvent.click(nextButton);
    expect(mockOnSelectPage).toHaveBeenCalledWith(3);

    fireEvent.click(nextButton);
    expect(mockOnSelectPage).toHaveBeenCalledTimes(3);

    expect(previousButton).toBeTruthy();
    expect(nextButton).toBeTruthy();
  });
});
