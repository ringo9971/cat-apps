import { Transaction } from '../../../../types/market/Expense';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

interface DeleteTransactionDialogProps {
  transaction: Transaction;
  deleteTransaction: (req: Transaction) => Promise<Transaction>;
  onClose: () => void;
}

export const DeleteTransactionDialog = ({
  transaction,
  deleteTransaction,
  onClose,
}: DeleteTransactionDialogProps) => (
  <Dialog open onClose={onClose}>
    <DialogTitle>削除</DialogTitle>
    <DialogContent>
      <Stack direction="column" spacing={2} sx={{ mt: 1 }}>
        <Typography>削除します</Typography>
        <Stack direction="column" spacing={2}>
          <TextField
            label="日付"
            type="date"
            value={transaction.date.toISOString().slice(0, 10)}
            disabled
          />

          <TextField label="ジャンル" value={transaction.category} disabled />

          <TextField
            label="金額"
            type="number"
            value={transaction.amount}
            disabled
          />
        </Stack>
      </Stack>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>キャンセル</Button>
      <Button
        variant="contained"
        color="error"
        onClick={() => {
          void deleteTransaction(transaction);
          onClose();
        }}
      >
        削除
      </Button>
    </DialogActions>
  </Dialog>
);
