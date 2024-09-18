import Component from 'features/market/components/WeeklyMenuDeleteDialog';
import { WeeklyMenu } from 'types/market/FoodMenu';

interface WeeklyMenuDeleteDialogProps {
  open: boolean;
  onClose: () => void;
  day: number;
  menu: string;
  deleteMenu: (day: number, menu: string) => Promise<WeeklyMenu>;
}

export const WeeklyMenuDeleteDialog = ({
  open,
  onClose,
  day,
  menu,
  deleteMenu,
}: WeeklyMenuDeleteDialogProps): JSX.Element => {
  const onDeleteWeeklyMenu = async () => {
    await deleteMenu(day, menu);
    onClose();
  };

  return (
    <Component
      open={open}
      onClose={onClose}
      menu={menu}
      onDeleteClick={onDeleteWeeklyMenu}
    />
  );
};

export default WeeklyMenuDeleteDialog;
