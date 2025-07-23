import type { Meta, StoryObj } from '@storybook/react';
import CustomerPage from './CustomerPage';
import { useAppStore } from '../store/appStore';
import type { Customer } from '../types';

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

const meta: Meta<typeof CustomerPage> = {
  title: 'Pages/CustomerPage',
  component: CustomerPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => {
      useAppStore.setState({ 
        customers: mockCustomers,
        currentUser: { id: 'user-1', username: 'admin', roleId: 'role-admin' }
      });
      return <Story />;
    },
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const NoCustomers: Story = {
    decorators: [
        (Story) => {
          useAppStore.setState({ 
            customers: [],
            currentUser: { id: 'user-1', username: 'admin', roleId: 'role-admin' }
          });
          return <Story />;
        },
      ],
};
