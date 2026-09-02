import { useState } from 'react';

import {
  Category,
  CreateTransactionRequest,
  Transaction,
} from '../../types/market/Expense';

interface FormValue {
  date: Date;
  amount: number | null;
  category: Category;
  memo: string;
  userUid: string;
}

const createInitialValue = (userUid: string): FormValue => {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  return {
    date: today,
    amount: null,
    category: 'その他',
    memo: '',
    userUid: userUid,
  };
};

const toRequest = (form: FormValue): CreateTransactionRequest => ({
  date: form.date,
  amount: form.amount ?? 0,
  category: form.category,
  memo: form.memo,
  userUid: form.userUid,
});

interface FormErrors {
  date?: string;
  amount?: string;
  category?: string;
}

const validateForm = (value: FormValue): FormErrors => {
  const errors: FormErrors = {};
  if (!value.date) errors.date = '日付を入力してください';
  if (value.amount === null) errors.amount = '金額を入力してください';
  if (!value.category) errors.category = 'ジャンルを選択してください';
  return errors;
};

interface CreateTransactionFormProps {
  userUid: string;
  createTransaction: (
    transaction: CreateTransactionRequest
  ) => Promise<Transaction>;
}

interface CreateTransactionForm {
  value: FormValue;
  errors: FormErrors;
  changeValue: <K extends keyof FormValue>(key: K, value: FormValue[K]) => void;
  isPending: boolean;
  submit: () => Promise<void>;
}

export const useCreateTransactionForm = ({
  userUid,
  createTransaction,
}: CreateTransactionFormProps): CreateTransactionForm => {
  const [value, setValue] = useState<FormValue>(createInitialValue(userUid));
  const [errors, setErrors] = useState<FormErrors>({});
  const [isPending, setIsPending] = useState(false);

  const changeValue = <K extends keyof FormValue>(
    key: K,
    value: FormValue[K]
  ) => {
    setValue((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const submit = async (): Promise<void> => {
    const nextErrors = validateForm(value);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsPending(true);
    const request = toRequest(value);

    try {
      await createTransaction(request);
      setValue((current) => ({
        ...current,
        amount: null,
      }));
    } finally {
      setIsPending(false);
    }
  };

  return {
    value,
    errors,
    changeValue,
    isPending,
    submit,
  };
};
