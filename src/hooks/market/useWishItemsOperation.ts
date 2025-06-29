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
      listType: 'wishList' | 'refrigeratorList';
    };

export interface UseWishItemsOperationState {
  wishList: Array<WishItem>;
  refrigeratorList: Array<WishItem>;
  dialogState: DialogState;
  openCreateDialog: () => void;
  openDeleteDialog: (
    wishItem: WishItem,
    listType: 'wishList' | 'refrigeratorList'
  ) => void;
  closeDialog: () => void;
  createWishItem: (
    wishItem: CreateWishItem,
    prepend?: boolean
  ) => Promise<WishItem>;
  deleteWishItem: (
    wishItem: WishItem,
    listType: 'wishList' | 'refrigeratorList'
  ) => Promise<WishItem>;
  toggleAndMoveWishItem: (wishItem: WishItem) => Promise<WishItem>;
  sortWishList: (wishList: Array<WishItem>) => Promise<Array<WishItem>>;
}

const useWishItemsOperation = (): UseWishItemsOperationState => {
  const [dialogState, setDialogState] = useState<DialogState>({ open: null });
  const [wishList, setWishList] = useState<Array<WishItem>>([]);
  const [refrigeratorList, setRefrigeratorList] = useState<Array<WishItem>>([]);
  const apiClient = useApiClient();

  const openCreateDialog = () => {
    setDialogState({ open: 'create' });
  };

  const openDeleteDialog = (
    wishItem: WishItem,
    listType: 'wishList' | 'refrigeratorList'
  ) => {
    setDialogState({ open: 'delete', wishItem, listType });
  };

  const closeDialog = () => {
    setDialogState({ open: null });
  };

  const getWishLists = useCallback(async (): Promise<{
    wishList: Array<WishItem>;
    refrigeratorList: Array<WishItem>;
  }> => {
    const wishListRes = await apiClient.getList<Array<WishItem>>(
      'market',
      'wishList'
    );
    const refrigeratorListRes = await apiClient.getList<Array<WishItem>>(
      'market',
      'refrigeratorList'
    );
    return { wishList: wishListRes, refrigeratorList: refrigeratorListRes };
  }, [apiClient]);

  const createWishItem = async (
    wishItem: CreateWishItem,
    prepend?: boolean
  ): Promise<WishItem> => {
    const res = await apiClient.addListItem<CreateWishItem, WishItem>(
      'market',
      'wishList',
      wishItem,
      prepend
    );
    setWishList((list) => (prepend ? [res, ...list] : [...list, res]));
    return res;
  };

  const deleteWishItem = async (
    wishItem: WishItem,
    listType: 'wishList' | 'refrigeratorList'
  ): Promise<WishItem> => {
    if (listType === 'wishList') {
      setWishList((list) => list.filter((l) => l.id !== wishItem.id));
      await apiClient.deleteListItem<WishItem>('market', 'wishList', wishItem);
    } else if (listType === 'refrigeratorList') {
      setRefrigeratorList((list) => list.filter((l) => l.id !== wishItem.id));
      await apiClient.deleteListItem<WishItem>(
        'market',
        'refrigeratorList',
        wishItem
      );
    }
    return wishItem;
  };

  const toggleAndMoveWishItem = async (
    wishItem: WishItem
  ): Promise<WishItem> => {
    const toggledData = {
      ...wishItem,
      check: !wishItem.check,
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { time, ...toggledDataForApi } = toggledData;

    if (wishItem.tag === '食品') {
      if (toggledData.check) {
        // wishList から refrigeratorList へ移動
        setWishList((list) => list.filter((w) => w.id !== toggledData.id));
        await apiClient.deleteListItem('market', 'wishList', toggledData);
        const newItem = await apiClient.addListItem(
          'market',
          'refrigeratorList',
          toggledDataForApi
        );
        setRefrigeratorList((list) => [...list, newItem]);
        return newItem;
      } else {
        // refrigeratorList から wishList へ移動
        setRefrigeratorList((list) =>
          list.filter((w) => w.id !== toggledData.id)
        );
        await apiClient.deleteListItem(
          'market',
          'refrigeratorList',
          toggledData
        );
        const newItem = await apiClient.addListItem(
          'market',
          'wishList',
          toggledDataForApi,
          true
        );
        setWishList((list) => [newItem, ...list]);
        return newItem;
      }
    } else {
      // 食品以外はタブ間の移動はなし
      const newList = moveWishItem(wishList, toggledData);
      setWishList(newList);
      await apiClient.update<{ list: Array<WishItem> }>('market', 'wishList', {
        list: newList,
      });
      return toggledData;
    }
  };

  const moveWishItem = (
    list: Array<WishItem>,
    item: WishItem
  ): Array<WishItem> => {
    const filtered = list.filter((w) => w.id !== item.id);

    if (item.check) {
      const index = filtered.findIndex((w) => w.check);
      if (index === -1) return [...filtered, item];
      return [...filtered.slice(0, index), item, ...filtered.slice(index)];
    } else {
      return [item, ...filtered];
    }
  };

  const sortWishList = async (
    wishList: Array<WishItem>
  ): Promise<Array<WishItem>> => {
    setWishList(wishList);
    const res = await apiClient.update<{ list: Array<WishItem> }>(
      'market',
      'wishList',
      {
        list: wishList,
      }
    );
    return res.list;
  };

  useEffect(() => {
    const fetch = async () => {
      const { wishList, refrigeratorList } = await getWishLists();
      setWishList(wishList);
      setRefrigeratorList(refrigeratorList);
    };
    fetch();

    const intervalId = setInterval(() => fetch(), 10000);

    return () => clearInterval(intervalId);
  }, [getWishLists]);

  return {
    wishList,
    refrigeratorList,
    dialogState,
    openCreateDialog,
    openDeleteDialog,
    closeDialog,
    createWishItem,
    deleteWishItem,
    toggleAndMoveWishItem,
    sortWishList,
  };
};

export default useWishItemsOperation;
