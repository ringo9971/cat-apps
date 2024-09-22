import { useApiClient } from 'hooks/useApiClient';
import { useCallback, useEffect, useState } from 'react';
import { CreateToDoItem, ToDoItem } from 'types/market/ToDoItem';

type DialogState =
  | {
      open: null;
    }
  | {
      open: 'create';
    }
  | {
      open: 'delete';
      item: ToDoItem;
    };

interface UseToDoOperationState {
  items: Array<ToDoItem>;
  dialogState: DialogState;
  openCreateDialog: () => void;
  openDeleteDialog: (item: ToDoItem) => void;
  closeDialog: () => void;
  addItem: (item: CreateToDoItem) => Promise<ToDoItem>;
  deleteItem: (item: ToDoItem) => Promise<ToDoItem>;
}

const useToDoOperation = (): UseToDoOperationState => {
  const apiClient = useApiClient();

  const [items, setItems] = useState<Array<ToDoItem>>([]);
  const [dialogState, setDialogState] = useState<DialogState>({ open: null });

  const openCreateDialog = () => {
    setDialogState({ open: 'create' });
  };

  const openDeleteDialog = (item: ToDoItem) => {
    setDialogState({ open: 'delete', item });
  };

  const closeDialog = () => {
    setDialogState({ open: null });
  };

  const getItems = useCallback(async (): Promise<Array<ToDoItem>> => {
    const res = await apiClient.getList<Array<ToDoItem>>('market', 'toDo');
    return res;
  }, [apiClient]);

  const addItem = async (item: CreateToDoItem): Promise<ToDoItem> => {
    const res = await apiClient.addListItem<CreateToDoItem, ToDoItem>(
      'market',
      'toDo',
      item
    );
    setItems((foods) => [...foods, res]);
    return res;
  };

  const deleteItem = async (item: ToDoItem): Promise<ToDoItem> => {
    const res = await apiClient.deleteListItem<ToDoItem>(
      'market',
      'toDo',
      item
    );
    setItems((foods) => foods.filter((f) => f.id !== item.id));
    return res;
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await getItems();
      setItems(res);
    };
    fetch();
  }, [getItems, setItems]);

  return {
    items,
    dialogState,
    openCreateDialog,
    openDeleteDialog,
    closeDialog,
    addItem,
    deleteItem,
  };
};

export default useToDoOperation;
