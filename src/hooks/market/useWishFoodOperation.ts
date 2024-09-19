import { useApiClient } from 'hooks/useApiClient';
import { useCallback, useEffect, useState } from 'react';
import { CreateWishFood, WishFood } from 'types/market/FoodMenu';

type DialogState =
  | {
      open: null;
    }
  | {
      open: 'create';
    }
  | {
      open: 'delete';
      food: WishFood;
    };

interface UseFoodMenuOperationState {
  wishFoods: Array<WishFood>;
  dialogState: DialogState;
  openCreateDialog: () => void;
  openDeleteDialog: (food: WishFood) => void;
  closeDialog: () => void;
  addFood: (food: CreateWishFood) => Promise<WishFood>;
}

const useFoodMenuOperation = (): UseFoodMenuOperationState => {
  const apiClient = useApiClient();

  const [dialogState, setDialogState] = useState<DialogState>({ open: null });
  const [wishFoods, setWishFoods] = useState<Array<WishFood>>([]);

  const openCreateDialog = () => {
    setDialogState({ open: 'create' });
  };

  const openDeleteDialog = (food: WishFood) => {
    setDialogState({ open: 'delete', food });
  };

  const closeDialog = () => {
    setDialogState({ open: null });
  };

  const getWishFoods = useCallback(async (): Promise<Array<WishFood>> => {
    const res = await apiClient.getList<Array<WishFood>>('market', 'wishFood');
    return res;
  }, [apiClient]);

  const addFood = async (food: CreateWishFood): Promise<WishFood> => {
    const res = await apiClient.addListItem<CreateWishFood, WishFood>(
      'market',
      'wishFood',
      food
    );
    setWishFoods((foods) => [...foods, res]);
    return res;
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await getWishFoods();
      setWishFoods(res);
    };
    fetch();
  }, [getWishFoods, setWishFoods]);

  return {
    wishFoods,
    dialogState,
    openCreateDialog,
    openDeleteDialog,
    closeDialog,
    addFood,
  };
};

export default useFoodMenuOperation;
