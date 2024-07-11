// src/tests/ListOptions.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ListOptions, { Option, ListOptionsProps } from '../components/ListOptions';

const options: Option[] = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

const renderComponent = (props: Partial<ListOptionsProps> = {}) => {
  const defaultProps: ListOptionsProps = {
    options: options,
    selectedOption: null,
    onChange: jest.fn(),
    onClear: jest.fn(),
    placeholder: 'Select an option',
    ...props,
  };

  return render(<ListOptions {...defaultProps} />);
};

describe('ListOptions Component', () => {
  test('renders options correctly', () => {
    renderComponent();

    // Check that the placeholder is present
    expect(screen.getByText(/Select an option/i)).toBeTruthy();

    // Check that all options are rendered
    options.forEach(option => {
      expect(screen.getByText(option.label)).toBeTruthy();
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
