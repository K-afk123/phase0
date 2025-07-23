// src/types/index.ts

// --- 権限管理 (RBAC) ---

/**
 * 操作権限の種類
 * @description 各ユーザーが実行可能な操作を定義します。
 */
export type Permission =
  | 'MANAGE_COMPANY_PROFILE' // 発行元・各種設定の変更
  | 'MANAGE_CUSTOMERS' // 顧客の登録・編集
  | 'MANAGE_PRODUCTS' // 商品の登録・編集
  | 'CREATE_QUOTE' // 見積書の作成・編集
  | 'CREATE_INVOICE' // 請求書の作成・編集
  | 'UPDATE_PAYMENT_STATUS' // 入金ステータスの変更
  | 'MANAGE_USERS_AND_ROLES'; // ユーザー・役割の管理

/**
 * ユーザーの役割
 * @description 権限の集合体です。
 */
export interface Role {
  id: string;
  name: string; // 例: "管理者", "営業担当"
  permissions: Permission[];
}

/**
 * アプリケーションのユーザー
 */
export interface User {
  id: string;
  username: string;
  roleId: Role['id'];
}


// --- 発行元（自社）情報 ---

/**
 * 銀行口座情報
 */
export interface BankAccount {
  id: string;
  bankName: string; // 銀行名
  branchName: string; // 支店名
  accountType: '普通' | '当座'; // 口座種別
  accountNumber: string; // 口座番号
  accountHolder: string; // 口座名義
}

/**
 * 発行元（自社）のプロフィール
 */
export interface CompanyProfile {
  id: string;
  name: string; // 会社名
  zipCode: string; // 郵便番号
  address: string; // 住所
  phone?: string; // 電話番号
  logoUrl?: string; // ロゴ画像のURL
  sealUrl?: string; // 会社印画像のURL
  bankAccounts: BankAccount[]; // 銀行口座 (3件まで)
  // TODO: 採番ルールなどを追加
}


// --- 取引先・商品マスター ---

/**
 * 顧客の支払条件
 */
export interface PaymentTerms {
  closingDay: '末日' | number; // 締め日 (例: 20, '末日')
  paymentMonth: '翌月' | '翌々月'; // 支払月
  paymentDay: '末日' | number; // 支払日 (例: 25, '末日')
}

/**
 * 顧客情報
 */
export interface Customer {
  id: string;
  name: string; // 顧客名
  honorific: '御中' | '様'; // 敬称
  zipCode: string; // 郵便番号
  address: string; // 住所
  department?: string; // 部署
  contactPerson?: string; // 担当者名
  paymentTerms: PaymentTerms; // 支払条件
  isArchived: boolean; // アーカイブ状態
}

/**
* 税区分
*/
export type TaxType = '内税' | '外税' | '非課税';

/**
 * 商品・サービスのマスタデータ
 */
export interface Product {
  id: string;
  code?: string; // 品番・商品コード
  name: string; // 品名
  unitPrice: number; // 単価
  unit: string; // 単位 (例: "式", "個", "人月")
  defaultTaxType: TaxType; // デフォルトの税区分
  isArchived: boolean; // アーカイブ状態
}


// --- 書類関連 ---

/**
 * 書類の種類
 */
export type DocumentType = '見積書' | '請求書' | '納品書' | '領収書';

/**
 * 書類のステータス
 */
export type DocumentStatus = '下書き' | '発行済み' | '承認待ち' | '入金済み' | '期限超過' | '失注';

/**
 * 書類の明細項目（階層構造）
 */
export interface DocumentLineItem {
  id: string;
  level: 'large' | 'medium' | 'small'; // 大/中/小項目
  name: string; // 品名
  quantity?: number; // 数量
  unit?: string; // 単位
  unitPrice?: number; // 単価
  taxType: TaxType; // 税区分
  amount: number; // 金額 (quantity * unitPrice)
  children: DocumentLineItem[]; // 子項目
}

/**
 * 書類（見積書・請求書など）の本体
 */
export interface Document {
  id: string; // 書類番号 (例: INV-202507-0012)
  documentType: DocumentType;
  customerId: Customer['id'];
  companyProfileId: CompanyProfile['id'];
  issueDate: string; // 発行日 (YYYY-MM-DD)
  paymentDueDate: string; // 支払期限 (YYYY-MM-DD)
  status: DocumentStatus;
  lineItems: DocumentLineItem[]; // 明細項目
  subtotal: number; // 小計 (税抜合計)
  taxAmount: number; // 消費税額
  totalAmount: number; // 合計金額 (税込)
  selectedBankAccountId?: BankAccount['id']; // 選択された振込先口座
  notes?: string; // 備考欄
}
