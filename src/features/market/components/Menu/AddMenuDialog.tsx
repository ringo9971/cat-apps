import { CreateMenu } from '@/types/market/Menu.ts';
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { Control, Controller } from 'react-hook-form';

export interface AddMenuDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  control: Control<CreateMenu>;
  categories: ReadonlyArray<string>;
}

const AddMenuDialog = ({
  open,
  onClose,
  onSubmit,
  control,
  categories,
}: AddMenuDialogProps) => (
  <Dialog open={open} onClose={onClose} fullWidth>
    <DialogTitle>献立追加</DialogTitle>
    <form onSubmit={onSubmit}>
      <DialogContent>
        <Stack spacing={1}>
          <Controller
            name="name"
            control={control}
            rules={{ required: 'メニュー名は必須です' }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="メニュー名"
                variant="outlined"
                fullWidth
                autoFocus
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
          <Controller
            name="category"
            control={control}
            rules={{ required: 'カテゴリは必須です' }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Autocomplete
                freeSolo
                options={categories}
                value={value}
                onChange={(_, newValue) => {
                  onChange(newValue || '');
                }}
                onInputChange={(_, newValue) => {
                  onChange(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="カテゴリ"
                    variant="outlined"
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            )}
          />
          <Controller
            name="difficulty"
            control={control}
            render={({ field: { onChange, value } }) => (
              <ToggleButtonGroup
                value={value}
                exclusive
                onChange={(_, newValue) => {
                  if (newValue != null) {
                    onChange(newValue);
                  }
                }}
              >
                <ToggleButton value="easy">簡単</ToggleButton>
                <ToggleButton value="normal">普通</ToggleButton>
                <ToggleButton value="hard">難しい</ToggleButton>
              </ToggleButtonGroup>
            )}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>キャンセル</Button>
        <Button variant="contained" type="submit">
          追加
        </Button>
      </DialogActions>
    </form>
  </Dialog>
);

export default AddMenuDialog;
