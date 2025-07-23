import type { Meta, StoryObj } from '@storybook/react';
import CompanyPage from './CompanyPage';
import { useAppStore } from '../store/appStore';
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

const meta: Meta<typeof CompanyPage> = {
  title: 'Pages/CompanyPage',
  component: CompanyPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => {
      useAppStore.setState({ 
        companyProfiles: [mockProfile],
        currentUser: { id: 'user-1', username: 'admin', roleId: 'role-admin' }
      });
      return <MemoryRouter><Story /></MemoryRouter>;
    },
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const NoProfile: Story = {
    decorators: [
        (Story) => {
          useAppStore.setState({ 
            companyProfiles: [],
            currentUser: { id: 'user-1', username: 'admin', roleId: 'role-admin' }
          });
          return <MemoryRouter><Story /></MemoryRouter>;
        },
      ],
};
