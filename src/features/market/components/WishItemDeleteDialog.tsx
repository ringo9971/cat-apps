import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from '@mui/material';
import { UpdateWishItem } from 'types/market/WishItem';

export interface WishItemDeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onDeleteClick: () => void;
  wishItem: UpdateWishItem;
}

const WishItemDeleteDialog = ({
  open,
  onClose,
  onDeleteClick,
  wishItem,
}: WishItemDeleteDialogProps): JSX.Element => (
  <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth={true}>
    <DialogTitle>削除の確認</DialogTitle>
    <DialogContent>
      <Grid container>「{wishItem.name}」を削除しますか？</Grid>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>キャンセル</Button>
      <Button variant="contained" onClick={onDeleteClick}>
        削除
      </Button>
    </DialogActions>
  </Dialog>
);

export default WishItemDeleteDialog;
