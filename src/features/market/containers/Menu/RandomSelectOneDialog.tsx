import { useMemo } from 'react';

import Component from '@/features/market/components/Menu/RandomSelectOneDialog';
import {
  CreateMenu,
  Menu,
  ScheduledMenu,
  difficultyOrder,
} from '@/types/market/Menu.ts';
import { useForm, useWatch } from 'react-hook-form';

export interface RandomSelectOneDialogProps {
  open: boolean;
  onClose: () => void;
  menus: ReadonlyArray<Menu>;
  categories: ReadonlyArray<string>;
  date: string;
  randomOne: (
    date: string,
    category?: string,
    difficulty?: CreateMenu['difficulty']
  ) => void;
  updateScheduledMenu: (menu: ScheduledMenu) => void;
}

export interface FormMenu {
  name: string;
  category: string;
  difficulty: null | Menu['difficulty'];
}

const RandomSelectOneDialog = ({
  open,
  onClose,
  menus,
  categories,
  date,
  randomOne,
  updateScheduledMenu,
}: RandomSelectOneDialogProps) => {
  const { control, handleSubmit, reset } = useForm<FormMenu>({
    defaultValues: {
      name: '',
      category: '',
      difficulty: null,
    },
  });

  const category = useWatch({ control, name: 'category' });
  const difficulty = useWatch({ control, name: 'difficulty' });

  const menuNames = useMemo(() => {
    return menus
      .filter((menu) => (category ? menu.category === category : true))
      .filter((menu) =>
        difficulty && menu.difficulty
          ? difficultyOrder[menu.difficulty] <= difficultyOrder[difficulty]
          : true
      )
      .map((menu) => menu.name);
  }, [menus, category, difficulty]);

  const onSubmit = (menu: FormMenu) => {
    if (menu.name !== '') {
      updateScheduledMenu({
        name: menu.name,
        date,
        category: menu.category,
        difficulty: menu.difficulty || 'normal',
      });
    } else {
      randomOne(
        date,
        menu.category,
        menu.difficulty === null ? undefined : menu.difficulty
      );
    }
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
      menuNames={menuNames}
      categories={categories}
    />
  );
};

export default RandomSelectOneDialog;
