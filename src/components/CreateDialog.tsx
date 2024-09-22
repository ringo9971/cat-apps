import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from '@mui/material';

export interface CreateDialogProps<T> {
  open: boolean;
  onClose: () => void;
  onCreate: () => void;
  title: string;
  item: T;
  updateItem: (item: string) => void;
}

const CreateDialog = <T extends { name: string }>({
  open,
  onClose,
  onCreate,
  title,
  item,
  updateItem,
}: CreateDialogProps<T>): JSX.Element => (
  <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth={true}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <Grid container>
        <TextField
          value={item.name}
          onChange={(e) => updateItem(e.target.value)}
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

export default CreateDialog;
