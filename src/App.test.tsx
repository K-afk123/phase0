import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App component', () => {
  it('renders headline', () => {
    // 1. Appコンポーネントを描画する
    render(<App />);

    // 2. 画面内に "Vite + React" という見出しが表示されているか探す
    const headline = screen.getByText(/Vite \+ React/i);

    // 3. 見出しがちゃんと存在することを期待する（テスト成功条件）
    expect(headline).toBeInTheDocument();
  });
});
