import { useState } from 'react';

import {
  Category,
  Transaction,
  UpdateTransactionRequest,
} from '../../types/market/Expense';

interface FormValue {
  date: Date;
  amount: number | null;
  category: Category;
  memo: string;
}

const toRequest = (
  transaction: Transaction,
  form: FormValue
): UpdateTransactionRequest => ({
  id: transaction.id,
  date: form.date,
  amount: form.amount ?? 0,
  category: form.category,
  memo: form.memo,
  userUid: transaction.userUid,
  time: transaction.time,
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

interface UpdateTransactionFormProps {
  userUid: string;
  transaction: Transaction;
  updateTransaction: (
    transaction: UpdateTransactionRequest
  ) => Promise<Transaction>;
}

interface UpdateTransactionForm {
  value: FormValue;
  errors: FormErrors;
  changeValue: <K extends keyof FormValue>(key: K, value: FormValue[K]) => void;
  isPending: boolean;
  submit: () => Promise<void>;
}

export const useUpdateTransactionForm = ({
  userUid,
  transaction,
  updateTransaction,
}: UpdateTransactionFormProps): UpdateTransactionForm => {
  const [value, setValue] = useState<FormValue>({
    date: transaction.date,
    amount: transaction.amount,
    category: transaction.category,
    memo: transaction.memo,
  });
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
    const request = toRequest(transaction, value);

    try {
      await updateTransaction(request);
      setValue((current) => ({
        ...current,
        amount: null,
        memo: '',
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
