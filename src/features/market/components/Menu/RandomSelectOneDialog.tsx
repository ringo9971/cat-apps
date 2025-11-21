import { FormMenu } from '@/features/market/containers/Menu/RandomSelectOneDialog.tsx';
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
  Typography,
} from '@mui/material';
import { Control, Controller } from 'react-hook-form';

export interface RandomSelectAllDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  control: Control<FormMenu>;
  menuNames: ReadonlyArray<string>;
  categories: ReadonlyArray<string>;
}

const RandomSelectAllDialog = ({
  open,
  onClose,
  onSubmit,
  control,
  menuNames,
  categories,
}: RandomSelectAllDialogProps) => (
  <Dialog open={open} onClose={onClose} fullWidth>
    <DialogTitle>献立の再選択</DialogTitle>
    <form onSubmit={onSubmit}>
      <DialogContent sx={{ mt: -2 }}>
        <Stack spacing={1}>
          <Typography>献立をランダムに選び直します</Typography>
          <Controller
            name="category"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                options={categories}
                value={value}
                onChange={(_, newValue) => {
                  onChange(newValue || '');
                }}
                onInputChange={(_, newValue) => {
                  onChange(newValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} label="カテゴリ" variant="outlined" />
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
                  onChange(newValue);
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
      <DialogContent sx={{ mt: -2 }}>
        <Stack spacing={1}>
          <Typography>
            メニュー名を入力した場合は、ランダムではなく指定したメニューに変更されます
          </Typography>
          <Controller
            name="name"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                freeSolo
                options={menuNames}
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
                    label="メニュー名"
                    variant="outlined"
                  />
                )}
              />
            )}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>キャンセル</Button>
        <Button variant="contained" type="submit">
          OK
        </Button>
      </DialogActions>
    </form>
  </Dialog>
);

export default RandomSelectAllDialog;
