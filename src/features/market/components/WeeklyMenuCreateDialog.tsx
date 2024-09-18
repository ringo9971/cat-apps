import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

export interface WishListCreateDialogProps {
  open: boolean;
  onClose: () => void;
  onCreateClick: () => void;
  day: number;
  setDay: Dispatch<SetStateAction<number>>;
  menu: string;
  setMenu: Dispatch<SetStateAction<string>>;
}

const labels = ['月', '火', '水', '木', '金', '土', '日'];
const daysOfWeek = [0, 1, 2, 3, 4, 5, 6];

const WishListCreateDialog = ({
  open,
  onClose,
  onCreateClick,
  day,
  setDay,
  menu,
  setMenu,
}: WishListCreateDialogProps): JSX.Element => (
  <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth={true}>
    <DialogTitle>食べたいもの</DialogTitle>
    <DialogContent>
      <Grid container>
        <ToggleButtonGroup exclusive value={day} onChange={(_, d) => setDay(d)}>
          {daysOfWeek.map((day) => (
            <ToggleButton key={day} value={day} aria-label={labels[day]}>
              {labels[day]}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <TextField
          value={menu}
          onChange={(e) => setMenu(e.target.value)}
          sx={{ width: '80%' }}
        />
      </Grid>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>キャンセル</Button>
      <Button variant="contained" onClick={onCreateClick}>
        追加
      </Button>
    </DialogActions>
  </Dialog>
);

export default WishListCreateDialog;
