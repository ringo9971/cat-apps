import { Box, Card, CardContent } from '@mui/material';
import { Transaction } from 'types/market/Expense';

const formatDisplayDate = (date: Date) => {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${month}-${day}`;
};

interface TransactionCardProps {
  transaction: Transaction;
}

export const TransactionCard = ({ transaction }: TransactionCardProps) => (
  <Card>
    <CardContent>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'auto auto 1fr',
          columnGap: 2,
        }}
      >
        <Box>{formatDisplayDate(transaction.date)}</Box>
        <Box>{transaction.category}</Box>
        <Box sx={{ textAlign: 'right' }}>{transaction.amount}円</Box>
      </Box>
    </CardContent>
  </Card>
);
