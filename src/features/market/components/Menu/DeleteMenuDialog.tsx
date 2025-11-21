import { Menu } from '@/types/market/Menu.ts';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

export interface DeleteMenuDialogProps {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
  menu: Menu;
}

const DeleteMenuDialog = ({
  open,
  onClose,
  onDelete,
  menu,
}: DeleteMenuDialogProps) => (
  <Dialog open={open} onClose={onClose} fullWidth>
    <DialogTitle>献立削除</DialogTitle>
    <DialogContent>「{menu.name}」を献立から削除しても良いですか</DialogContent>
    <DialogActions>
      <Button onClick={onClose}>キャンセル</Button>
      <Button variant="contained" onClick={onDelete}>
        削除
      </Button>
    </DialogActions>
  </Dialog>
);

export default DeleteMenuDialog;
