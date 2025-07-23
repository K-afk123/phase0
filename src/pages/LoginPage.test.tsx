import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import LoginPage from './LoginPage';

describe('LoginPage component', () => {
  it('renders login form correctly', () => {
    // 1. ログインページを描画
    render(<LoginPage />);

    // 2. "ログイン" というカードのタイトルが表示されていることを確認
    // getByText('ログイン')だけでは、ボタンのテキストと区別がつかずエラーになるため、
    // selectorオプションを使い、カードのタイトル部分(.ant-card-head-title)に限定して検索します。
    expect(screen.getByText('ログイン', { selector: 'div.ant-card-head-title' })).toBeInTheDocument();

    // 3. ユーザー名の入力欄が表示されていることを確認
    expect(screen.getByPlaceholderText('ユーザー名')).toBeInTheDocument();

    // 4. パスワードの入力欄が表示されていることを確認
    expect(screen.getByPlaceholderText('パスワード')).toBeInTheDocument();

    // 5. "ログイン" ボタンが表示されていることを確認
    expect(screen.getByRole('button', { name: 'ログイン' })).toBeInTheDocument();
  });
});
