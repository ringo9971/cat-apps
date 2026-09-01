import { useCallback, useEffect, useState } from 'react';

import { useApiClient } from 'hooks/useApiClient';
import { CreateTransactionRequest, Transaction } from 'types/market/Expense';

interface UseExpenseOperationHook {
  transactions: Array<Transaction>;
  createTransaction: (
    transaction: CreateTransactionRequest
  ) => Promise<Transaction>;
  deleteTransaction: (transaction: Transaction) => Promise<Transaction>;
}

export const useExpenseOperation = (): UseExpenseOperationHook => {
  const apiClient = useApiClient();

  const [transactions, setTransactions] = useState<Array<Transaction>>([]);

  const getItems = useCallback(async (): Promise<Array<Transaction>> => {
    const res = await apiClient.getList<Array<Transaction>>(
      'market',
      'expense'
    );
    return res;
  }, [apiClient]);

  const createTransaction = async (
    item: CreateTransactionRequest
  ): Promise<Transaction> => {
    const res = await apiClient.addListItem<
      CreateTransactionRequest,
      Transaction
    >('market', 'expense', item);
    setTransactions((transactions) => [...transactions, res]);
    return res;
  };

  const deleteTransaction = async (item: Transaction): Promise<Transaction> => {
    const res = await apiClient.deleteListItem<Transaction>(
      'market',
      'expense',
      item
    );
    setTransactions((foods) => foods.filter((f) => f.id !== item.id));
    return res;
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await getItems();
      setTransactions(res);
    };
    fetch();
  }, [getItems, setTransactions]);

  return {
    transactions,
    createTransaction,
    deleteTransaction,
  };
};
