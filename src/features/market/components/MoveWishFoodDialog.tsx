import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from '@mui/material';

export interface MoveWishFoodDialogProps {
  open: boolean;
  onClose: () => void;
  onMoveClick: () => void;
  menu: string;
}

const MoveWishFoodDialog = ({
  open,
  onClose,
  onMoveClick,
  menu,
}: MoveWishFoodDialogProps): JSX.Element => (
  <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth={true}>
    <DialogTitle>メモに移動</DialogTitle>
    <DialogContent>
      <Grid container>
        <Typography>{menu}</Typography>
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

export default MoveWishFoodDialog;
