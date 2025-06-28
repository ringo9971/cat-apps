import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from '@mui/material';

export interface DeleteDialogProps<T> {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
  item: T;
}

const DeleteDialog = <T extends { name: string }>({
  open,
  onClose,
  onDelete,
  item,
}: DeleteDialogProps<T>): JSX.Element => (
  <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth={true}>
    <DialogTitle>削除の確認</DialogTitle>
    <DialogContent>
      <Grid container>「{item.name}」を削除しますか？</Grid>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>キャンセル</Button>
      <Button variant="contained" onClick={onDelete}>
        削除
      </Button>
    </DialogActions>
  </Dialog>
);

export default DeleteDialog;
