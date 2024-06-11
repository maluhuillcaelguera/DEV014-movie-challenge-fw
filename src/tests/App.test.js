import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import {expect, test} from '@jest/globals';

test('renders welcome message', () => {
  render(<App />);
  const welcomeMessage = screen.getByText(/welcome/i);
  expect(welcomeMessage).toBeInTheDocument();
});
