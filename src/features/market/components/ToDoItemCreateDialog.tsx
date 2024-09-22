import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from '@mui/material';
import { CreateToDoItem } from 'types/market/ToDoItem';

export interface ToDoItemCreateDialogProps {
  open: boolean;
  onClose: () => void;
  onCreate: () => void;
  item: CreateToDoItem;
  updateToDoItem: (item: string) => void;
}

const ToDoItemCreateDialog = ({
  open,
  onClose,
  onCreate,
  item,
  updateToDoItem: updateToDoItem,
}: ToDoItemCreateDialogProps): JSX.Element => (
  <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth={true}>
    <DialogTitle>メモ</DialogTitle>
    <DialogContent>
      <Grid container>
        <TextField
          value={item.name}
          onChange={(e) => updateToDoItem(e.target.value)}
          sx={{ width: '80%' }}
        />
      </Grid>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>キャンセル</Button>
      <Button variant="contained" onClick={onCreate}>
        作成
      </Button>
    </DialogActions>
  </Dialog>
);

export default ToDoItemCreateDialog;
