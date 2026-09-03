export const CATEGORIES = [
  'お菓子',
  '薬品',
  '衣料品',
  'ゲーム',
  '雑貨',
  'その他',
] as const;

export type Category = (typeof CATEGORIES)[number];

export interface Transaction {
  id: string;
  date: Date;
  amount: number;
  category: Category;
  memo: string;
  userUid: string;
  time: Date;
}

export interface CreateTransactionRequest {
  date: Date;
  amount: number;
  category: Category;
  memo: string;
  userUid: string;
}

export interface UpdateTransactionRequest {
  id: string;
  date: Date;
  amount: number;
  category: Category;
  memo: string;
  userUid: string;
  time: Date;
}
