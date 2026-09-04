import { useState } from 'react';

import { useExpenseOperation } from '../../../hooks/market/useExpenseOperation';
import { Transaction } from '../../../types/market/Expense';
import { CreateTransaction } from '../components/Expense/CreateTransaction';
import { TransactionCard } from '../components/Expense/TransactionCard';
import { UpdateTransactionDialog } from '../components/Expense/UpdateTransactionDialog';
import { Box, Typography } from '@mui/material';

type ExpenseDialogState = {
  type: 'updateTransaction';
  transaction: Transaction;
} | null;

interface ExpensePageProps {
  userUid: string;
}

export const ExpensePage = ({ userUid }: ExpensePageProps) => {
  const { transactions, createTransaction, updateTransaction } =
    useExpenseOperation();

  const [dialog, setDialog] = useState<ExpenseDialogState>(null);

  const handleClose = () => setDialog(null);

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

      <Box>
        {transactions.map((item) => (
          <TransactionCard
            key={item.id}
            transaction={item}
            openEditDialog={(transaction: Transaction) =>
              setDialog({
                type: 'updateTransaction',
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
    </Box>
  );
};
