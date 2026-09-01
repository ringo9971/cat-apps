import { CreateTransaction } from '../components/Expense/CreateTransaction';
import { TransactionCard } from '../components/Expense/TransactionCard';
import { useExpenseOperation } from '@/hooks/market/useExpenseOperation';
import { Box, Typography } from '@mui/material';

export const ExpensePage = () => {
  const { transactions, createTransaction } = useExpenseOperation();

  return (
    <Box>
      <Box component="details" sx={{ pt: 1, pb: 1 }}>
        <Typography color="primary" component="summary">
          登録
        </Typography>
        <CreateTransaction createTransaction={createTransaction} />
      </Box>

      <Box>
        {transactions.map((item) => (
          <TransactionCard key={item.id} transaction={item} />
        ))}
      </Box>
    </Box>
  );
};
