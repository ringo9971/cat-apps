import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from '@mui/material';
import { CreateWishFood } from 'types/market/FoodMenu';

export interface WishFoodCreateDialogProps {
  open: boolean;
  onClose: () => void;
  onCreateClick: () => void;
  food: CreateWishFood;
  updateWishFood: (food: string) => void;
}

const WishFoodCreateDialog = ({
  open,
  onClose,
  onCreateClick,
  food,
  updateWishFood: updateWishFood,
}: WishFoodCreateDialogProps): JSX.Element => (
  <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth={true}>
    <DialogTitle>食べたいもの</DialogTitle>
    <DialogContent>
      <Grid container>
        <TextField
          value={food.name}
          onChange={(e) => updateWishFood(e.target.value)}
          sx={{ width: '80%' }}
        />
      </Grid>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>キャンセル</Button>
      <Button variant="contained" onClick={onCreateClick}>
        作成
      </Button>
    </DialogActions>
  </Dialog>
);

export default WishFoodCreateDialog;
