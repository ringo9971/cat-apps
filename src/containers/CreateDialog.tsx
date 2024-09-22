import Component from 'components/CreateDialog';
import { useState } from 'react';

interface CreateDialogProps<T, U> {
  open: boolean;
  onClose: () => void;
  title: string;
  addItem: (item: T) => Promise<U>;
}

export const CreateDialog = <T extends { name: string }, U>({
  open,
  onClose,
  title,
  addItem,
}: CreateDialogProps<T, U>): JSX.Element => {
  const [item, setItem] = useState<T>({ name: '' } as T);
  const updateItem = (item: string) => {
    setItem((i) => ({ ...i, name: item }));
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
      title={title}
      item={item}
      updateItem={updateItem}
    />
  );
};

export default CreateDialog;
