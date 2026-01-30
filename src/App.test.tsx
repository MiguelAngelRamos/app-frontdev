import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  it('debe renderizar el título correctamente', () => {
    render(<App />);
    const titleElement = screen.getByText(/Vite \+ React/i);
    expect(titleElement).toBeTruthy();
  });

  it('debe inicializar el contador en 0', () => {
    render(<App />);
    const buttonElement = screen.getByRole('button', { name: /count is 0/i });
    expect(buttonElement).toBeTruthy();
  });

  it('debe incrementar el contador al hacer click', () => {
    render(<App />);
    const buttonElement = screen.getByRole('button', { name: /count is 0/i });
    
    fireEvent.click(buttonElement);
    
    expect(screen.getByText(/count is 1/i)).toBeTruthy();
  });

  it('validación básica del pipeline', () => {
    expect(1 + 1).toBe(2);
  });
});
