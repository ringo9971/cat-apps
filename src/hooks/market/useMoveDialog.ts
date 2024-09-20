import { useState } from 'react';
import { WishFood } from 'types/market/FoodMenu';

type DialogState =
  | {
      open: null;
    }
  | {
      open: 'toWeeklyMenu';
      food: WishFood;
    };

interface UseMoveDialogState {
  dialogState: DialogState;
  openToWeeklyMenuDialog: (food: WishFood) => void;
  closeDialog: () => void;
}

const useMoveDialog = (): UseMoveDialogState => {
  const [dialogState, setDialogState] = useState<DialogState>({ open: null });

  const openToWeeklyMenuDialog = (food: WishFood) => {
    setDialogState({ open: 'toWeeklyMenu', food });
  };

  const closeDialog = () => {
    setDialogState({ open: null });
  };

  return {
    dialogState,
    openToWeeklyMenuDialog,
    closeDialog,
  };
};

export default useMoveDialog;
