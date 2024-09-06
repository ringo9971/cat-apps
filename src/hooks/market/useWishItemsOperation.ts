import { useState } from 'react';
import { CreateWishItem, WishItem } from 'types/market/WishItem';

type DialogState =
  | {
      open: null;
    }
  | {
      open: 'create';
    }
  | {
      open: 'delete';
      wishItem: WishItem;
    };

interface UseWishItemsOperationState {
  dialogState: DialogState;
  openCreateDialog: () => void;
  openDeleteDialog: (wishItem: WishItem) => void;
  closeDialog: () => void;
  createWishItem: (wishItem: CreateWishItem) => Promise<WishItem>;
  deleteWishItem: (wishItem: WishItem) => Promise<WishItem>;
  toggleWishItem: (wishItem: WishItem) => Promise<WishItem>;
}

const useWishItemsOperation = (): UseWishItemsOperationState => {
  const [dialogState, setDialogState] = useState<DialogState>({ open: null });

  const openCreateDialog = () => {
    setDialogState({ open: 'create' });
  };

  const openDeleteDialog = (wishItem: WishItem) => {
    setDialogState({ open: 'delete', wishItem });
  };

  const closeDialog = () => {
    setDialogState({ open: null });
  };

  const createWishItem = async (
    wishItem: CreateWishItem
  ): Promise<WishItem> => {
    return {
      id: '0',
      time: new Date(),
      check: false,
      ...wishItem,
    };
  };

  const deleteWishItem = async (wishItem: WishItem): Promise<WishItem> => {
    return wishItem;
  };

  const toggleWishItem = async (wishItem: WishItem): Promise<WishItem> => {
    return {
      ...wishItem,
      check: !wishItem.check,
    };
  };

  return {
    dialogState,
    openCreateDialog,
    openDeleteDialog,
    closeDialog,
    createWishItem,
    deleteWishItem,
    toggleWishItem,
  };
};

export default useWishItemsOperation;
