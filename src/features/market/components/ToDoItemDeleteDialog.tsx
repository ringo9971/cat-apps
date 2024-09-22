import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from '@mui/material';
import { UpdateToDoItem } from 'types/market/ToDoItem';

export interface ToDoItemDeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
  item: UpdateToDoItem;
}

const ToDoItemDeleteDialog = ({
  open,
  onClose,
  onDelete,
  item,
}: ToDoItemDeleteDialogProps): JSX.Element => (
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

export default ToDoItemDeleteDialog;
