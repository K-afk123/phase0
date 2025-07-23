import { create } from 'zustand';
import type { User, CompanyProfile, Customer, Product, Document } from '../types';

// --- ストアの状態(State)の型定義 ---
interface AppState {
  // 認証関連
  currentUser: User | null;
  
  // マスターデータ
  companyProfiles: CompanyProfile[];
  customers: Customer[];
  products: Product[];

  // 書類データ
  documents: Document[];
  
  // UIの状態
  isLoading: boolean;
  error: string | null;
}

// --- ストアのアクション(Action)の型定義 ---
interface AppActions {
  // アクションの例 (後で実装)
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
    // TODO: ログイン処理を実装
    console.log('Logging in with:', username, password);
    // 例: ログイン成功時
    // set({ currentUser: fetchedUser });
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
