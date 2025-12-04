import { useMemo } from 'react';

import Component from '@/features/market/components/Menu/WeeklyMenu';
import {
  DisplayScheduledMenu,
  type WeeklyMenu,
  convertDisplayScheduledMenu,
} from '@/types/market/Menu.ts';

interface WeeklyMenuProps {
  weeklyMenu: WeeklyMenu;
  openRandomAll: () => void;
  openRandomOne: (date: string) => void;
}

const WeeklyMenu = ({
  weeklyMenu,
  openRandomAll,
  openRandomOne,
}: WeeklyMenuProps) => {
  const displayWeeklyMenu = useMemo(() => {
    const displayWeeklyMenu = new Map<string, DisplayScheduledMenu>();
    weeklyMenu.menus.forEach((menu) => {
      displayWeeklyMenu.set(menu.date, convertDisplayScheduledMenu(menu));
    });
    return { menus: displayWeeklyMenu };
  }, [weeklyMenu.menus]);

  return (
    <Component
      weeklyMenu={displayWeeklyMenu}
      openRandomAll={openRandomAll}
      openRandomOne={openRandomOne}
    />
  );
};

export default WeeklyMenu;
