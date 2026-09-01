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
    setTransactions((transactions) =>
      [...transactions, res].sort((a, b) => {
        const dateA = a.date.toISOString().slice(0, 10);
        const dateB = b.date.toISOString().slice(0, 10);
        if (dateA !== dateB) {
          return dateB.localeCompare(dateA);
        }
        return b.time.getTime() - a.time.getTime();
      })
    );
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
      res.sort((a, b) => {
        const dateA = a.date.toISOString().slice(0, 10);
        const dateB = b.date.toISOString().slice(0, 10);
        if (dateA !== dateB) {
          return dateB.localeCompare(dateA);
        }
        return b.time.getTime() - a.time.getTime();
      });
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
