import { useMemo } from 'react';

import Component from '@/features/market/components/Menu/MenuList';
import type { Menu } from '@/types/market/Menu.ts';
import {
  categoryOrder,
  difficultyOrder,
  generateColor,
} from '@/types/market/Menu.ts';

interface MenuListProps {
  menus: Menu[];
  openAddMenuDialog: () => void;
  openDeleteMenuDialog: (menu: Menu) => void;
}

const MenuList = ({
  menus,
  openAddMenuDialog,
  openDeleteMenuDialog,
}: MenuListProps) => {
  const groups = useMemo(() => {
    const map = new Map<string, Array<Menu & { color: string }>>();
    menus.forEach((menu) => {
      const group = map.get(menu.category) ?? [];
      group.push({
        ...menu,
        color: generateColor(menu.category, menu.difficulty),
      });
      map.set(menu.category, group);
    });

    const grouped = [...map.entries()].map(([category, menus]) => ({
      category,
      menus: menus.sort(
        (a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
      ),
    }));

    return grouped.sort((a, b) => {
      const aOrder = categoryOrder[a.category];
      const bOrder = categoryOrder[b.category];
      const inA = aOrder !== undefined;
      const inB = bOrder !== undefined;

      if (inA && inB) {
        return aOrder - bOrder;
      } else if (inA) {
        return -1;
      } else if (inB) {
        return 1;
      }
      return a.category.localeCompare(b.category);
    });
  }, [menus]);

  return (
    <Component
      groups={groups}
      openAddMenuDialog={openAddMenuDialog}
      openDeleteMenuDialog={openDeleteMenuDialog}
    />
  );
};

export default MenuList;
