import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock para archivos estáticos (imágenes, SVG, etc.)
vi.mock('./assets/react.svg', () => ({
  default: 'mocked-react-logo.svg'
}));

vi.mock('/vite.svg', () => ({
  default: 'mocked-vite-logo.svg'
}));