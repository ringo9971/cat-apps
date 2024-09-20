import Component from 'features/market/components/MoveWishFoodDialog';
import { WishFood, WeeklyMenu, CreateWishFood } from 'types/market/FoodMenu';

interface MoveWishFoodDialogProps {
  open: boolean;
  onClose: () => void;
  day: number;
  menu: string;
  addFood: (food: CreateWishFood) => Promise<WishFood>;
  deleteWeeklyMenu: (d: number, menu: string) => Promise<WeeklyMenu>;
}

export const MoveWishFoodDialog = ({
  open,
  onClose,
  day,
  menu,
  addFood,
  deleteWeeklyMenu,
}: MoveWishFoodDialogProps): JSX.Element => {
  const onMoveMoveWishFood = async () => {
    await addFood({ name: menu });
    await deleteWeeklyMenu(day, menu);
    onClose();
  };

  return (
    <Component
      open={open}
      onClose={onClose}
      onMoveClick={onMoveMoveWishFood}
      menu={menu}
    />
  );
};

export default MoveWishFoodDialog;
