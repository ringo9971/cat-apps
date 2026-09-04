import { useCallback, useEffect, useState } from 'react';

import { useApiClient } from '../../hooks/useApiClient';
import {
  CreateTransactionRequest,
  Transaction,
} from '../../types/market/Expense';

interface UseExpenseOperationHook {
  transactions: Array<Transaction>;
  createTransaction: (
    transaction: CreateTransactionRequest
  ) => Promise<Transaction>;
  updateTransaction: (transaction: Transaction) => Promise<Transaction>;
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
    req: CreateTransactionRequest
  ): Promise<Transaction> => {
    const res = await apiClient.addListItem<
      CreateTransactionRequest,
      Transaction
    >('market', 'expense', req);
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

  const updateTransaction = async (req: Transaction): Promise<Transaction> => {
    const res = await apiClient.updateListItem<Transaction>(
      'market',
      'expense',
      req
    );
    setTransactions((transactions) =>
      transactions.map((t) => (t.id === req.id ? req : t))
    );
    return res;
  };

  const deleteTransaction = async (req: Transaction): Promise<Transaction> => {
    const res = await apiClient.deleteListItem<Transaction>(
      'market',
      'expense',
      req
    );
    setTransactions((transactions) =>
      transactions.filter((t) => t.id !== req.id)
    );
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
    updateTransaction,
    deleteTransaction,
  };
};
