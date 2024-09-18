import Component from 'features/market/components/WeeklyMenuCreateDialog';
import { useState } from 'react';
import { WeeklyMenu } from 'types/market/FoodMenu';

interface WeeklyMenuCreateDialogProps {
  open: boolean;
  onClose: () => void;
  addMenu: (d: number, menu: string) => Promise<WeeklyMenu>;
}

export const WeeklyMenuCreateDialog = ({
  open,
  onClose,
  addMenu,
}: WeeklyMenuCreateDialogProps): JSX.Element => {
  const [day, setDay] = useState(0);
  const [menu, setMenu] = useState('');

  const onCreateWeeklyMenu = async () => {
    await addMenu(day, menu);
    onClose();
  };

  return (
    <Component
      open={open}
      onClose={onClose}
      onCreateClick={onCreateWeeklyMenu}
      day={day}
      setDay={setDay}
      menu={menu}
      setMenu={setMenu}
    />
  );
};

export default WeeklyMenuCreateDialog;
