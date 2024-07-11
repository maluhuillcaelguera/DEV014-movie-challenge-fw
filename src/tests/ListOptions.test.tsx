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
    renderComponent({ onChange: handleChange });

    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'option1' } });

    expect(handleChange).toHaveBeenCalledWith({ value: 'option1', label: 'Option 1' });
  });

  test('calls onClear when the clear button is clicked', () => {
    const handleClear = jest.fn();
    renderComponent({ selectedOption: options[0], onClear: handleClear });

    fireEvent.click(screen.getByText(/Clear Selection/i));

    expect(handleClear).toHaveBeenCalled();
  });

  test('does not render clear button when no option is selected', () => {
    renderComponent();

    expect(screen.queryByText(/Clear Selection/i)).toBeNull();
  });

  test('renders clear button when an option is selected', () => {
    renderComponent({ selectedOption: options[0] });

    expect(screen.getByText(/Clear Selection/i)).toBeTruthy();
  });

  test('displays the correct selected option', () => {
    renderComponent({ selectedOption: options[1] });

    expect((screen.getByRole('combobox') as HTMLSelectElement).value).toBe('option2');
  });

  test('disables the placeholder option', () => {
    renderComponent();

    const placeholderOption = screen.getByText(/Select an option/i);
    expect(placeholderOption).toBeTruthy();
    expect((placeholderOption as HTMLOptionElement).disabled).toBe(true);
  });
});
