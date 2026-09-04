import { useUpdateTransactionForm } from '../../../../hooks/market/useUpdateTransactionForm';
import { CATEGORIES, Transaction } from '../../../../types/market/Expense';
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';

interface UpdateTransactionDialogProps {
  transaction: Transaction;
  updateTransaction: (req: Transaction) => Promise<Transaction>;
  onClose: () => void;
}

export const UpdateTransactionDialog = ({
  transaction,
  updateTransaction,
  onClose,
}: UpdateTransactionDialogProps) => {
  const form = useUpdateTransactionForm({ transaction, updateTransaction });

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>編集</DialogTitle>
      <DialogContent>
        <Stack direction="column" spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="日付"
            type="date"
            value={form.value.date.toISOString().slice(0, 10)}
            onChange={(e) => {
              form.changeValue('date', new Date(e.target.value));
            }}
            error={Boolean(form.errors.date)}
            helperText={form.errors.date}
          />

          <Autocomplete
            fullWidth
            options={CATEGORIES}
            value={form.value.category}
            onChange={(_, value) => {
              if (value == null) return;
              form.changeValue('category', value);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="ジャンル"
                error={Boolean(form.errors.category)}
                helperText={form.errors.category}
              />
            )}
          />

          <TextField
            label="金額"
            type="number"
            value={form.value.amount ?? ''}
            onChange={(e) => {
              const value = e.target.value;
              form.changeValue('amount', value === '' ? null : Number(value));
            }}
            error={Boolean(form.errors.amount)}
            helperText={form.errors.amount}
          />

          <TextField
            label="メモ"
            value={form.value.memo ?? ''}
            onChange={(e) => form.changeValue('memo', e.target.value)}
            multiline
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>キャンセル</Button>
        <Button
          variant="contained"
          onClick={async () => {
            const success = await form.submit();
            if (success) {
              onClose();
            }
          }}
          loading={form.isPending}
        >
          更新
        </Button>
      </DialogActions>
    </Dialog>
  );
};
