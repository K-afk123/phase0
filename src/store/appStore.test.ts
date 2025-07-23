import { describe, it, expect, beforeEach } from 'vitest';
import { useAppStore } from './appStore';
import type { Customer } from '../types';

describe('appStore', () => {
  // 各テストの前にストアの状態をリセットする
  beforeEach(() => {
    useAppStore.setState({
      customers: [],
      // 他の状態も必要に応じてリセット
    });
  });

  it('should have correct initial state', () => {
    const state = useAppStore.getState();
    expect(state.currentUser).toBeNull();
    expect(state.customers).toEqual([]);
    expect(state.products).toEqual([]);
    expect(state.isLoading).toBe(false);
  });

  it('should add a new customer', () => {
    const newCustomerData: Omit<Customer, 'id' | 'isArchived'> = {
      name: '株式会社テスト商事',
      honorific: '御中',
      zipCode: '123-4567',
      address: '東京都テスト区',
      paymentTerms: {
        closingDay: '末日',
        paymentMonth: '翌月',
        paymentDay: '末日',
      },
    };

    // addCustomerアクションを実行
    useAppStore.getState().addCustomer(newCustomerData);

    const state = useAppStore.getState();
    
    // 顧客が1人追加されていることを確認
    expect(state.customers).toHaveLength(1);
    // 追加された顧客の名前が正しいことを確認
    expect(state.customers[0].name).toBe('株式会社テスト商事');
    // アーカイブ状態が正しく設定されていることを確認
    expect(state.customers[0].isArchived).toBe(false);
  });
});
