import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { useAppStore } from '../store/appStore';
import MainLayout from './MainLayout';
import type { User } from '../types';
import { MemoryRouter } from 'react-router-dom';

const mockUser: User = {
  id: 'user-1',
  username: 'admin',
  roleId: 'role-admin',
};

describe('MainLayout component', () => {
  beforeEach(() => {
    useAppStore.setState({ currentUser: mockUser });
  });

  it('renders the layout with user information', () => {
    render(
      <MemoryRouter>
        <MainLayout>
          <div>テストコンテンツ</div>
        </MainLayout>
      </MemoryRouter>
    );

    expect(screen.getByText(/ようこそ、adminさん/i)).toBeInTheDocument();
    expect(screen.getByText('顧客管理')).toBeInTheDocument();
    expect(screen.getByText('テストコンテンツ')).toBeInTheDocument();
  });
});
