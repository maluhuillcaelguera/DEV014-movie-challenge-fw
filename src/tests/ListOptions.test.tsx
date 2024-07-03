import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ListOptions from '../components/ListOptions';

describe('ListOptions Component', () => {
  const options = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
  ];

  test('renders options correctly', () => {
    render(<ListOptions options={options} selectedOption={null} onChange={() => {}} onClear={() => {}} />);
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    options.forEach(option => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  test('calls onChange when an option is selected', () => {
    const handleChange = jest.fn();
    render(<ListOptions options={options} selectedOption={null} onChange={handleChange} onClear={() => {}} />);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: '2' } });
    expect(handleChange).toHaveBeenCalledWith({ value: '2', label: 'Option 2' });
  });

  test('calls onClear when clear button is clicked', () => {
    const handleClear = jest.fn();
    render(<ListOptions options={options} selectedOption={options[1]} onChange={() => {}} onClear={handleClear} />);
    const button = screen.getByText('Clear Selection');
    fireEvent.click(button);
    expect(handleClear).toHaveBeenCalled();
  });

  test('highlights the selected option correctly', () => {
    render(<ListOptions options={options} selectedOption={options[1]} onChange={() => {}} onClear={() => {}} />);
    const select = screen.getByRole('combobox');
    expect(select.value).toBe('2');
  });
});
