import { useCreateTransactionForm } from '../../../../hooks/market/useCreateTransactionForm';
import {
  CATEGORIES,
  CreateTransactionRequest,
  Transaction,
} from '../../../../types/market/Expense';
import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
} from '@mui/material';

interface CreateTransactionProps {
  userUid: string;
  createTransaction: (
    transaction: CreateTransactionRequest
  ) => Promise<Transaction>;
}

export const CreateTransaction = ({
  userUid,
  createTransaction,
}: CreateTransactionProps) => {
  const form = useCreateTransactionForm({ userUid, createTransaction });

  return (
    <Card>
      <CardContent>
        <Stack direction="column" spacing={2}>
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

          <Button
            variant="contained"
            onClick={() => void form.submit()}
            loading={form.isPending}
          >
            追加
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};
