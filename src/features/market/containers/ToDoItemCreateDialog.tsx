import Component from 'features/market/components/ToDoItemCreateDialog';
import { useState } from 'react';
import { CreateToDoItem, ToDoItem } from 'types/market/ToDoItem';

interface ToDoItemCreateDialogProps {
  open: boolean;
  onClose: () => void;
  addItem: (item: CreateToDoItem) => Promise<ToDoItem>;
}

export const ToDoItemCreateDialog = ({
  open,
  onClose,
  addItem,
}: ToDoItemCreateDialogProps): JSX.Element => {
  const [item, setItem] = useState<CreateToDoItem>({
    name: '',
  });

  const updateToDoItem = (name: string) => {
    setItem({ name });
  };

  const onCreate = async () => {
    await addItem(item);
    onClose();
  };

  return (
    <Component
      open={open}
      onClose={onClose}
      onCreate={onCreate}
      item={item}
      updateToDoItem={updateToDoItem}
    />
  );
};

export default ToDoItemCreateDialog;
