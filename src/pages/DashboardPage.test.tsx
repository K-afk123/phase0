import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { useAppStore } from '../store/appStore';
import DashboardPage from './DashboardPage';
import type { User } from '../types';
import { MemoryRouter } from 'react-router-dom';

const mockUser: User = {
  id: 'user-1',
  username: 'admin',
  roleId: 'role-admin',
};

describe('DashboardPage component', () => {
  beforeEach(() => {
    useAppStore.setState({ currentUser: mockUser });
  });

  it('renders dashboard specific content', () => {
    render(
      <MemoryRouter>
        <DashboardPage />
      </MemoryRouter>
    );

    expect(screen.getByText('ダッシュボード', { selector: 'div.ant-card-head-title' })).toBeInTheDocument();
    expect(screen.getByText('user-1')).toBeInTheDocument();
  });
});
