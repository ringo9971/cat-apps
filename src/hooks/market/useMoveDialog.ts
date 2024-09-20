import { useState } from 'react';
import { WishFood } from 'types/market/FoodMenu';

type DialogState =
  | {
      open: null;
    }
  | {
      open: 'toWishFood';
      day: number;
      menu: string;
    }
  | {
      open: 'toWeeklyMenu';
      food: WishFood;
    };

interface UseMoveDialogState {
  dialogState: DialogState;
  openToWishFoodDialog: (day: number, menu: string) => void;
  openToWeeklyMenuDialog: (food: WishFood) => void;
  closeDialog: () => void;
}

const useMoveDialog = (): UseMoveDialogState => {
  const [dialogState, setDialogState] = useState<DialogState>({ open: null });

  const openToWishFoodDialog = (day: number, menu: string) => {
    setDialogState({ open: 'toWishFood', day, menu });
  };

  const openToWeeklyMenuDialog = (food: WishFood) => {
    setDialogState({ open: 'toWeeklyMenu', food });
  };

  const closeDialog = () => {
    setDialogState({ open: null });
  };

  return {
    dialogState,
    openToWishFoodDialog,
    openToWeeklyMenuDialog,
    closeDialog,
  };
};

export default useMoveDialog;
