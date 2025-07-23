// src/setupTests.ts
import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Ant Designのコンポーネントがテスト環境で動作するために、
// ブラウザの 'matchMedia' 機能を模倣(モック)します。
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
