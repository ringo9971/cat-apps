import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from '@mui/material';

export interface WeeklyMenuDeleteDialogProps {
  open: boolean;
  onClose: () => void;
  menu: string;
  onDeleteClick: () => void;
}

const WeeklyMenuDeleteDialog = ({
  open,
  onClose,
  menu,
  onDeleteClick,
}: WeeklyMenuDeleteDialogProps): JSX.Element => (
  <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth={true}>
    <DialogTitle>削除の確認</DialogTitle>
    <DialogContent>
      <Grid container>「{menu}」を削除しますか？</Grid>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>キャンセル</Button>
      <Button variant="contained" onClick={onDeleteClick}>
        削除
      </Button>
    </DialogActions>
  </Dialog>
);

export default WeeklyMenuDeleteDialog;
