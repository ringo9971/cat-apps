import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

export interface RandomSelectAllDialogProps {
  open: boolean;
  onClose: () => void;
  handleClickRandom: () => void;
}

const RandomSelectAllDialog = ({
  open,
  onClose,
  handleClickRandom,
}: RandomSelectAllDialogProps) => (
  <Dialog open={open} onClose={onClose} fullWidth>
    <DialogTitle>献立ランダム選択</DialogTitle>
    <DialogContent>
      まだ決まっていない日の献立をランダムに選択します
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>キャンセル</Button>
      <Button variant="contained" onClick={handleClickRandom}>
        OK
      </Button>
    </DialogActions>
  </Dialog>
);

export default RandomSelectAllDialog;
