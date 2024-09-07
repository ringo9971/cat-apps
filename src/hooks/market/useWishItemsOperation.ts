import { useApiClient } from 'hooks/useApiClient';
import { useCallback, useEffect, useState } from 'react';
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
  wishList: Array<WishItem>;
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
  const [wishList, setWishList] = useState<Array<WishItem>>([]);
  const apiClient = useApiClient();

  const openCreateDialog = () => {
    setDialogState({ open: 'create' });
  };

  const openDeleteDialog = (wishItem: WishItem) => {
    setDialogState({ open: 'delete', wishItem });
  };

  const closeDialog = () => {
    setDialogState({ open: null });
  };

  const getWishList = useCallback(async (): Promise<Array<WishItem>> => {
    const res = await apiClient.getList<Array<WishItem>>('market', 'wishList');
    return res;
  }, [apiClient]);

  const createWishItem = async (
    wishItem: CreateWishItem
  ): Promise<WishItem> => {
    const res = await apiClient.addListItem<CreateWishItem, WishItem>(
      'market',
      'wishList',
      {
        check: false,
        ...wishItem,
      }
    );
    setWishList((list) => [...list, res]);
    return res;
  };

  const deleteWishItem = async (wishItem: WishItem): Promise<WishItem> => {
    const res = await apiClient.deleteListItem<WishItem>(
      'market',
      'wishList',
      wishItem
    );
    setWishList((list) => list.filter((l) => l.id !== res.id));
    return wishItem;
  };

  const toggleWishItem = async (wishItem: WishItem): Promise<WishItem> => {
    const toggledData = {
      ...wishItem,
      check: !wishItem.check,
    };
    setWishList((list) =>
      list.map((l) => (l.id === wishItem.id ? toggledData : l))
    );
    const res = await apiClient.updateListItem<WishItem>(
      'market',
      'wishList',
      toggledData
    );
    setWishList((list) => list.map((l) => (l.id === wishItem.id ? res : l)));
    return res;
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await getWishList();
      setWishList(res);
    };
    fetch();
  }, [getWishList, setWishList]);

  return {
    wishList,
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
