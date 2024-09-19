import Component from 'features/market/components/WishFoodCreateDialog';
import { useState } from 'react';
import { CreateWishFood, WishFood } from 'types/market/FoodMenu';

interface WishFoodCreateDialogProps {
  open: boolean;
  onClose: () => void;
  createWishFood: (food: CreateWishFood) => Promise<WishFood>;
}

export const WishFoodCreateDialog = ({
  open,
  onClose,
  createWishFood,
}: WishFoodCreateDialogProps): JSX.Element => {
  const [food, setWishFood] = useState<CreateWishFood>({
    name: '',
  });

  const updateWishFood = (food: string) => {
    setWishFood({ name: food });
  };

  const onCreateWishFood = async () => {
    await createWishFood(food);
    onClose();
  };

  return (
    <Component
      open={open}
      onClose={onClose}
      onCreateClick={onCreateWishFood}
      food={food}
      updateWishFood={updateWishFood}
    />
  );
};

export default WishFoodCreateDialog;
