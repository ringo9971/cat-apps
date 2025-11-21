import { CreateMenu } from '@/types/market/Menu.ts';
import Component from 'features/market/components/Menu/AddMenuDialog';
import { useForm } from 'react-hook-form';

export interface AddMenuDialogProps {
  open: boolean;
  onClose: () => void;
  addMenu: (menu: CreateMenu) => void;
  categories: ReadonlyArray<string>;
}

const AddMenuDialog = ({
  open,
  onClose,
  addMenu,
  categories,
}: AddMenuDialogProps) => {
  const { control, handleSubmit, reset } = useForm<CreateMenu>({
    defaultValues: {
      name: '',
      category: '',
      difficulty: 'normal',
    },
  });

  const onSubmit = (data: CreateMenu) => {
    addMenu(data);
    onClose();
  };

  const handleClose = () => {
    onClose();
    reset();
  };

  return (
    <Component
      open={open}
      onClose={handleClose}
      onSubmit={handleSubmit(onSubmit)}
      control={control}
      categories={categories}
    />
  );
};

export default AddMenuDialog;
