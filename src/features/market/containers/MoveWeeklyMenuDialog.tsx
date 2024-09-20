import Component from 'features/market/components/MoveWeeklyMenuCreateDialog';
import { useState } from 'react';
import { WeeklyMenu, WishFood } from 'types/market/FoodMenu';

interface MoveWeeklyMenuDialogProps {
  open: boolean;
  onClose: () => void;
  food: WishFood;
  addMenu: (d: number, menu: string) => Promise<WeeklyMenu>;
  deleteWishFood: (food: WishFood) => Promise<WishFood>;
}

export const MoveWeeklyMenuDialog = ({
  open,
  onClose,
  food,
  addMenu,
  deleteWishFood,
}: MoveWeeklyMenuDialogProps): JSX.Element => {
  const [day, setDay] = useState(0);

  const onMoveMoveWeeklyMenu = async () => {
    await addMenu(day, food.name);
    await deleteWishFood(food);
    onClose();
  };

  return (
    <Component
      open={open}
      onClose={onClose}
      onMoveClick={onMoveMoveWeeklyMenu}
      food={food}
      day={day}
      setDay={setDay}
    />
  );
};

export default MoveWeeklyMenuDialog;
