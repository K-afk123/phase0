import { create } from 'zustand';
import type { User, CompanyProfile, Customer, Product, Document } from '../types';

// --- ログイン成功時に設定するモックユーザー ---
const mockUser: User = {
  id: 'user-1',
  username: 'admin',
  roleId: 'role-admin',
};

// --- ストアの状態(State)の型定義 ---
interface AppState {
  currentUser: User | null;
  companyProfiles: CompanyProfile[];
  customers: Customer[];
  products: Product[];
  documents: Document[];
  isLoading: boolean;
  error: string | null;
}

// --- ストアのアクション(Action)の型定義 ---
interface AppActions {
  login: (username: string, pass: string) => Promise<void>;
  logout: () => void;
  addCustomer: (customer: Omit<Customer, 'id' | 'isArchived'>) => void;
}

// --- ストアの作成 ---
export const useAppStore = create<AppState & AppActions>((set) => ({
  // --- 初期状態 ---
  currentUser: null,
  companyProfiles: [],
  customers: [],
  products: [],
  documents: [],
  isLoading: false,
  error: null,

  // --- アクションの実装 ---
  login: async (username, password) => {
    set({ isLoading: true, error: null });
    // API呼び出しをシミュレートするための、0.5秒の待機
    await new Promise(resolve => setTimeout(resolve, 500));

    if (username === 'admin' && password === 'admin') {
      // ログイン成功
      set({ currentUser: mockUser, isLoading: false });
    } else {
      // ログイン失敗
      set({ error: 'ユーザー名またはパスワードが違います', isLoading: false });
    }
  },

  logout: () => {
    set({ currentUser: null });
  },

  addCustomer: (newCustomer) => {
    set((state) => ({
      customers: [
        ...state.customers,
        { 
          ...newCustomer, 
          id: `cust_${Date.now()}`, // 仮のIDを採番
          isArchived: false 
        }
      ]
    }));
  },
}));
