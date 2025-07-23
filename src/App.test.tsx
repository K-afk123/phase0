import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { useAppStore } from './store/appStore';
import type { User } from './types';

const mockUser: User = {
  id: 'user-1',
  username: 'admin',
  roleId: 'role-admin',
};

describe('App component routing', () => {
  it('renders LoginPage and redirects to /login when not authenticated', () => {
    useAppStore.setState({ currentUser: null });
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('ログイン', { selector: 'div.ant-card-head-title' })).toBeInTheDocument();
  });

  it('renders DashboardPage when authenticated at root path', () => {
    useAppStore.setState({ currentUser: mockUser });
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('ダッシュボード', { selector: 'div.ant-card-head-title' })).toBeInTheDocument();
  });

  it('renders CustomerPage when authenticated and navigating to /customers', () => {
    useAppStore.setState({ currentUser: mockUser });
    render(
      <MemoryRouter initialEntries={['/customers']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('顧客管理', { selector: 'div.ant-card-head-title' })).toBeInTheDocument();
  });
});
