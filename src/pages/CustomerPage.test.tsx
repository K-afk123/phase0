import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { useAppStore } from '../store/appStore';
import CustomerPage from './CustomerPage';
import type { Customer } from '../types';
import { MemoryRouter } from 'react-router-dom';

const mockCustomers: Customer[] = [
  {
    id: 'cust-1',
    name: '株式会社サンプル',
    honorific: '御中',
    zipCode: '100-0001',
    address: '東京都千代田区',
    paymentTerms: { closingDay: '末日', paymentMonth: '翌月', paymentDay: '末日' },
    isArchived: false,
  },
  {
    id: 'cust-2',
    name: 'テスト株式会社',
    honorific: '御中',
    zipCode: '541-0002',
    address: '大阪府大阪市',
    paymentTerms: { closingDay: 20, paymentMonth: '翌々月', paymentDay: 25 },
    isArchived: true,
  },
];

describe('CustomerPage component', () => {
  beforeEach(() => {
    useAppStore.setState({ 
      customers: mockCustomers,
      currentUser: { id: 'user-1', username: 'admin', roleId: 'role-admin' }
    });
  });

  it('renders customer table with data', () => {
    render(
      <MemoryRouter>
        <CustomerPage />
      </MemoryRouter>
    );

    expect(screen.getByText('顧客管理', { selector: 'div.ant-card-head-title' })).toBeInTheDocument();
    expect(screen.getByText('株式会社サンプル')).toBeInTheDocument();
    expect(screen.getByText('テスト株式会社')).toBeInTheDocument();
    expect(screen.getByText('有効')).toBeInTheDocument();
    expect(screen.getByText('アーカイブ済')).toBeInTheDocument();
  });
});
