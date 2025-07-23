import type { Meta, StoryObj } from '@storybook/react';
import ProductPage from './ProductPage';
import { useAppStore } from '../store/appStore';
import type { Product } from '../types';
import { MemoryRouter } from 'react-router-dom';

const mockProducts: Product[] = [
    {
      id: 'prod-1',
      code: 'ITEM-001',
      name: '標準作業',
      unitPrice: 10000,
      unit: '人日',
      defaultTaxType: '外税',
      isArchived: false,
    },
    {
      id: 'prod-2',
      code: 'ITEM-002',
      name: '旧製品A',
      unitPrice: 5000,
      unit: '個',
      defaultTaxType: '外税',
      isArchived: true,
    },
];

const meta: Meta<typeof ProductPage> = {
  title: 'Pages/ProductPage',
  component: ProductPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => {
      useAppStore.setState({ 
        products: mockProducts,
        currentUser: { id: 'user-1', username: 'admin', roleId: 'role-admin' }
      });
      return <MemoryRouter><Story /></MemoryRouter>;
    },
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const NoProducts: Story = {
    decorators: [
        (Story) => {
          useAppStore.setState({ 
            products: [],
            currentUser: { id: 'user-1', username: 'admin', roleId: 'role-admin' }
          });
          return <MemoryRouter><Story /></MemoryRouter>;
        },
      ],
};
