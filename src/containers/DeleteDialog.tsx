import Component from 'components/DeleteDialog';

interface DeleteDialogProps<T> {
  open: boolean;
  onClose: () => void;
  item: T;
  deleteItem: (item: T) => Promise<T>;
}

export const DeleteDialog = <T extends { name: string }>({
  open,
  onClose,
  item,
  deleteItem,
}: DeleteDialogProps<T>): JSX.Element => {
  const onDelete = async () => {
    await deleteItem(item);
    onClose();
  };

  return (
    <Component open={open} onClose={onClose} onDelete={onDelete} item={item} />
  );
};

export default DeleteDialog;
