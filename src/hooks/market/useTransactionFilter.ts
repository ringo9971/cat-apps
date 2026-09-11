import { useMemo, useState } from 'react';

import {
  Transaction,
  TransactionFilter,
  initialTransactionFilter,
} from '../../types/market/Expense';

interface TransactionFilterHook {
  filteredTransactions: Transaction[];
  filter: TransactionFilter;
  updateFilter: (patch: Partial<TransactionFilter>) => void;
}

interface TransactionFilterProps {
  userUid: string;
  transactions: Transaction[];
}

export const useTransactionFilter = ({
  userUid,
  transactions,
}: TransactionFilterProps): TransactionFilterHook => {
  const [filter, setFilter] = useState<TransactionFilter>(
    initialTransactionFilter
  );

  const filteredTransactions = useMemo(
    () =>
      transactions.filter((transaction) => {
        if (filter.owner === 'mine' && transaction.userUid !== userUid) {
          return false;
        }
        return true;
      }),
    [transactions, filter]
  );

  const updateFilter = (patch: Partial<TransactionFilter>) => {
    setFilter((current) => ({
      ...current,
      ...patch,
    }));
  };

  return {
    filteredTransactions,
    filter,
    updateFilter,
  };
};
