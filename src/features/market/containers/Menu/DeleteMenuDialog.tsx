import { Menu } from '@/types/market/Menu.ts';
import Component from 'features/market/components/Menu/DeleteMenuDialog';

export interface DeleteMenuDialogProps {
  open: boolean;
  onClose: () => void;
  deleteMenu: (menu: Menu) => void;
  menu: Menu;
}

const DeleteMenuDialog = ({
  open,
  onClose,
  deleteMenu,
  menu,
}: DeleteMenuDialogProps) => {
  const onDelete = () => {
    deleteMenu(menu);
    onClose();
  };

  return (
    <Component open={open} onClose={onClose} onDelete={onDelete} menu={menu} />
  );
};

export default DeleteMenuDialog;
