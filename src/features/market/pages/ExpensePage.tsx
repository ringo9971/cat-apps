import { useState } from 'react';

import { useExpenseOperation } from '../../../hooks/market/useExpenseOperation';
import { Transaction } from '../../../types/market/Expense';
import { CreateTransaction } from '../components/Expense/CreateTransaction';
import { DeleteTransactionDialog } from '../components/Expense/DeleteTransactionDialog';
import { ExpenseSummaryChart } from '../components/Expense/ExpenseSummaryChart';
import { TransactionCard } from '../components/Expense/TransactionCard';
import { UpdateTransactionDialog } from '../components/Expense/UpdateTransactionDialog';
import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';

type TransactionFilter = 'all' | 'mine';

type ExpenseDialogState =
  | {
      type: 'updateTransaction';
      transaction: Transaction;
    }
  | {
      type: 'deleteTransaction';
      transaction: Transaction;
    }
  | null;

interface ExpensePageProps {
  userUid: string;
}

export const ExpensePage = ({ userUid }: ExpensePageProps) => {
  const {
    transactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
  } = useExpenseOperation();

  const [dialog, setDialog] = useState<ExpenseDialogState>(null);
  const [filter, setFilter] = useState<TransactionFilter>('all');

  const handleClose = () => setDialog(null);

  const filteredTransations =
    filter === 'mine'
      ? transactions.filter((item) => item.userUid === userUid)
      : transactions;

  return (
    <Box>
      <Box component="details" sx={{ pt: 1, pb: 1 }}>
        <Typography color="primary" component="summary">
          登録
        </Typography>
        <CreateTransaction
          userUid={userUid}
          createTransaction={createTransaction}
        />
      </Box>

      <ToggleButtonGroup
        value={filter}
        onChange={(_, value) => setFilter(value)}
        size="small"
        exclusive
      >
        <ToggleButton value="all">全員</ToggleButton>
        <ToggleButton value="mine">自分</ToggleButton>
      </ToggleButtonGroup>

      <ExpenseSummaryChart transactions={filteredTransations} />

      <Box>
        {filteredTransations.map((item) => (
          <TransactionCard
            key={item.id}
            transaction={item}
            openEditDialog={(transaction: Transaction) =>
              setDialog({
                type: 'updateTransaction',
                transaction,
              })
            }
            openDeleteDialog={(transaction: Transaction) =>
              setDialog({
                type: 'deleteTransaction',
                transaction,
              })
            }
            isOwner={userUid === item.userUid}
          />
        ))}
      </Box>

      {dialog?.type === 'updateTransaction' && (
        <UpdateTransactionDialog
          transaction={dialog.transaction}
          updateTransaction={updateTransaction}
          onClose={handleClose}
        />
      )}
      {dialog?.type === 'deleteTransaction' && (
        <DeleteTransactionDialog
          transaction={dialog.transaction}
          deleteTransaction={deleteTransaction}
          onClose={handleClose}
        />
      )}
    </Box>
  );
};
