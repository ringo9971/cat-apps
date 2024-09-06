import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from '@mui/material';
import { UpdateWishItem } from 'types/market/WishItem';

export interface WishListCreateDialogProps {
  open: boolean;
  onClose: () => void;
  onCreateClick: () => void;
  wishItem: UpdateWishItem;
  updateWishItem: (name?: string, tag?: string) => void;
}

const WishListCreateDialog = ({
  open,
  onClose,
  onCreateClick,
  wishItem,
  updateWishItem,
}: WishListCreateDialogProps): JSX.Element => (
  <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth={true}>
    <DialogTitle>欲しいもの</DialogTitle>
    <DialogContent>
      <Grid container>
        <TextField
          value={wishItem.name}
          onChange={(e) => updateWishItem(e.target.value, wishItem.tag)}
          sx={{ width: '80%' }}
        />
        <Autocomplete
          options={['食品', '日用品', '家具家電']}
          value={'食品'}
          onInputChange={(_, selected: string) =>
            updateWishItem(wishItem.name, selected)
          }
          renderInput={(params) => <TextField {...params} />}
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

export default WishListCreateDialog;
