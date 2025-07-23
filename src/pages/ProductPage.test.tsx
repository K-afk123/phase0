import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { useAppStore } from '../store/appStore';
import ProductPage from './ProductPage';
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

describe('ProductPage component', () => {
  beforeEach(() => {
    // テストのために、モックデータをストアに設定
    useAppStore.setState({ 
        products: mockProducts,
        currentUser: { id: 'user-1', username: 'admin', roleId: 'role-admin' }
    });
  });

  it('renders product table with data', () => {
    render(
        <MemoryRouter>
            <ProductPage />
        </MemoryRouter>
    );

    // ページタイトルが表示されていることを確認
    expect(screen.getByText('商品管理', { selector: 'div.ant-card-head-title' })).toBeInTheDocument();

    // テーブルに商品名が表示されていることを確認
    expect(screen.getByText('標準作業')).toBeInTheDocument();
    expect(screen.getByText('旧製品A')).toBeInTheDocument();

    // フォーマットされた価格が表示されていることを確認
    expect(screen.getByText('¥10,000')).toBeInTheDocument();

    // ステータスのタグが正しく表示されていることを確認
    expect(screen.getByText('有効')).toBeInTheDocument();
    expect(screen.getByText('アーカイブ済')).toBeInTheDocument();
  });
});
