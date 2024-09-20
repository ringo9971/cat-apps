import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { WishFood } from 'types/market/FoodMenu';

export interface MoveWeeklyMenuDialogProps {
  open: boolean;
  onClose: () => void;
  onMoveClick: () => void;
  food: WishFood;
  day: number;
  setDay: Dispatch<SetStateAction<number>>;
}

const labels = ['月', '火', '水', '木', '金', '土', '日'];
const daysOfWeek = [0, 1, 2, 3, 4, 5, 6];

const MoveWeeklyMenuDialog = ({
  open,
  onClose,
  onMoveClick,
  food,
  day,
  setDay,
}: MoveWeeklyMenuDialogProps): JSX.Element => (
  <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth={true}>
    <DialogTitle>献立に移動</DialogTitle>
    <DialogContent>
      <Grid container>
        <ToggleButtonGroup exclusive value={day} onChange={(_, d) => setDay(d)}>
          {daysOfWeek.map((day) => (
            <ToggleButton key={day} value={day} aria-label={labels[day]}>
              {labels[day]}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <Typography>{food.name}</Typography>
      </Grid>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>キャンセル</Button>
      <Button variant="contained" onClick={onMoveClick}>
        移動
      </Button>
    </DialogActions>
  </Dialog>
);

export default MoveWeeklyMenuDialog;
