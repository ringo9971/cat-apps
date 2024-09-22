import Component from 'features/market/components/ToDoItemDeleteDialog';
import { ToDoItem } from 'types/market/ToDoItem';

interface ToDoItemDeleteDialogProps {
  open: boolean;
  onClose: () => void;
  item: ToDoItem;
  onDelete: (item: ToDoItem) => Promise<ToDoItem>;
}

export const ToDoItemDeleteDialog = ({
  open,
  onClose,
  item,
  onDelete,
}: ToDoItemDeleteDialogProps): JSX.Element => {
  const onDeleteItem = async () => {
    await onDelete(item);
    onClose();
  };

  return (
    <Component
      open={open}
      onClose={onClose}
      onDelete={onDeleteItem}
      item={item}
    />
  );
};

export default ToDoItemDeleteDialog;
