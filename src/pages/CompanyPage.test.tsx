import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { useAppStore } from '../store/appStore';
import CompanyPage from './CompanyPage';
import type { CompanyProfile } from '../types';
import { MemoryRouter } from 'react-router-dom';

const mockProfile: CompanyProfile = {
  id: 'comp-1',
  name: '株式会社テスト',
  zipCode: '123-4567',
  address: '東京都テスト区1-1-1',
  phone: '03-1234-5678',
  bankAccounts: [
    { id: 'bank-1', bankName: 'みずほ銀行', branchName: '渋谷支店', accountType: '普通', accountNumber: '1234567', accountHolder: 'カ)テスト' },
    { id: 'bank-2', bankName: '三菱UFJ銀行', branchName: '新宿支店', accountType: '当座', accountNumber: '7654321', accountHolder: 'カ)テスト' },
  ],
};

describe('CompanyPage component', () => {
  beforeEach(() => {
    useAppStore.setState({ 
        companyProfiles: [mockProfile],
        currentUser: { id: 'user-1', username: 'admin', roleId: 'role-admin' }
    });
  });

  it('renders company profile and bank accounts', () => {
    render(
        <MemoryRouter>
            <CompanyPage />
        </MemoryRouter>
    );

    // ページタイトルが表示されていることを確認
    expect(screen.getByText('発行元管理', { selector: 'div.ant-card-head-title' })).toBeInTheDocument();

    // 会社情報が表示されていることを確認
    expect(screen.getByText('株式会社テスト')).toBeInTheDocument();
    expect(screen.getByText('03-1234-5678')).toBeInTheDocument();

    // 銀行口座情報が表示されていることを確認
    expect(screen.getByText(/みずほ銀行/)).toBeInTheDocument();
    expect(screen.getByText(/三菱UFJ銀行/)).toBeInTheDocument();
  });
});
