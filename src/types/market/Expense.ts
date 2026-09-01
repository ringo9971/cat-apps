export interface Transaction {
  id: string;
  date: Date;
  amount: number;
  category: string;
  memo: string;
  time: Date;
}

export interface CreateTransactionRequest {
  date: Date;
  amount: number;
  category: string;
  memo: string;
}

export const CATEGORIES = [
  'お菓子',
  '薬品',
  '衣料品',
  'ゲーム',
  '雑貨',
  'その他',
] as const;

export type Category = (typeof CATEGORIES)[number];
