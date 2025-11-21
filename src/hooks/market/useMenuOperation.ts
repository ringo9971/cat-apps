import { useCallback, useEffect, useMemo, useState } from 'react';

import { createBaseMenu } from '@/api/ApiClient.ts';
import { useApiClient } from '@/hooks/useApiClient.tsx';
import {
  CreateMenu,
  Menu,
  ScheduledMenu,
  WeeklyMenu,
  difficultyOrder,
  menuToSchedle,
} from '@/types/market/Menu.ts';

type DialogState =
  | {
      open: null;
    }
  | {
      open: 'randomAll';
    }
  | {
      open: 'randomOne';
      date: string;
    }
  | {
      open: 'addMenu';
    }
  | {
      open: 'deleteMenu';
      menu: Menu;
    };

const today = new Date();
const end = new Date();
end.setDate(today.getDate() + 6);

function random(
  menus: Menu[],
  category?: string,
  difficulty?: Menu['difficulty']
): Menu {
  const filteredMenus = menus
    .filter((menu) => (category ? menu.category === category : true))
    .filter((menu) =>
      difficulty
        ? difficultyOrder[menu.difficulty] <= difficultyOrder[difficulty]
        : true
    );
  return filteredMenus[Math.floor(Math.random() * filteredMenus.length)];
}

interface UseMenuOperationState {
  dialogState: DialogState;
  openRandomAllDialog: () => void;
  openRandomOneDialog: (date: string) => void;
  openAddMenuDialog: () => void;
  openDeleteMenuDialog: (menu: Menu) => void;
  closeDialog: () => void;
  menus: Menu[];
  categories: string[];
  weeklyMenu: WeeklyMenu;
  randomAll: () => void;
  randomOne: (
    date: string,
    category?: string,
    difficulty?: Menu['difficulty']
  ) => void;
  addMenu: (menu: CreateMenu) => void;
  deleteMenu: (menu: Menu) => void;
  updateScheduledMenu: (menu: ScheduledMenu) => void;
}

const useMenuOperation = (): UseMenuOperationState => {
  const apiClient = useApiClient();

  const [dialogState, setDialogState] = useState<DialogState>({ open: null });
  const [menus, setMenus] = useState<Array<Menu>>([]);
  const [weeklyMenu, setWeeklyMenu] = useState<WeeklyMenu>(
    createBaseMenu(today, end)
  );
  const categories = useMemo(() => {
    return [...new Set(menus.map((menu) => menu.category))];
  }, [menus]);

  const openRandomAllDialog = () => {
    setDialogState({ open: 'randomAll' });
  };

  const openRandomOneDialog = (date: string) => {
    setDialogState({ open: 'randomOne', date });
  };

  const openAddMenuDialog = () => {
    setDialogState({ open: 'addMenu' });
  };

  const openDeleteMenuDialog = (menu: Menu) => {
    setDialogState({ open: 'deleteMenu', menu });
  };

  const closeDialog = () => {
    setDialogState({ open: null });
  };

  const getMenues = useCallback(async (): Promise<Menu[]> => {
    const res = await apiClient.getList<Menu[]>('market', 'menus');
    return res;
  }, [apiClient]);

  const getWeeklyMenu = useCallback(async (): Promise<WeeklyMenu> => {
    const res = await apiClient.getWeeklyMenu(today, end);
    return res;
  }, [apiClient]);

  const randomAll = useCallback(async (): Promise<void> => {
    const newPlan = structuredClone(weeklyMenu);
    newPlan.menus.forEach((value, key) => {
      if (!value.name || value.name === '') {
        const randomMenu = random(menus);
        newPlan.menus.set(key, menuToSchedle(randomMenu, key));
      }
    });
    const res = await apiClient.updateWeeklyMenu(newPlan);
    setWeeklyMenu(res);
  }, [menus, weeklyMenu, setWeeklyMenu, apiClient]);

  const randomOne = useCallback(
    async (
      date: string,
      category?: string,
      difficulty?: Menu['difficulty']
    ): Promise<void> => {
      if (!weeklyMenu.menus.has(date)) {
        return;
      }
      const randomMenu = menuToSchedle(
        random(menus, category, difficulty),
        date
      );
      const res = await apiClient.update<ScheduledMenu>(
        'menu',
        date,
        randomMenu
      );
      setWeeklyMenu((prev) => ({
        ...prev,
        menus: new Map(prev.menus).set(date, res),
      }));
    },
    [apiClient, menus, weeklyMenu.menus, setWeeklyMenu]
  );

  const updateScheduledMenu = useCallback(
    async (menu: ScheduledMenu) => {
      const res = await apiClient.update<ScheduledMenu>(
        'menu',
        menu.date,
        menu
      );
      setWeeklyMenu((prev) => ({
        ...prev,
        menus: new Map(prev.menus).set(res.date, res),
      }));
    },
    [apiClient, setWeeklyMenu]
  );

  const addMenu = useCallback(
    async (menu: CreateMenu): Promise<Menu> => {
      const res = await apiClient.addListItem<CreateMenu, Menu>(
        'market',
        'menus',
        menu
      );
      setMenus((menues) => [...menues, res]);
      return res;
    },
    [apiClient]
  );

  const deleteMenu = useCallback(
    async (menu: Menu): Promise<Menu> => {
      const res = await apiClient.deleteListItem<Menu>('market', 'menus', menu);
      setMenus((menues) => menues.filter((m) => m.id !== menu.id));
      return res;
    },
    [apiClient]
  );

  useEffect(() => {
    const fetch = async () => {
      const res = await getWeeklyMenu();
      setWeeklyMenu(res);
    };
    fetch();
  }, [getWeeklyMenu, setWeeklyMenu]);

  useEffect(() => {
    const fetch = async () => {
      const res = await getMenues();
      setMenus(res);
    };
    fetch();
  }, [getMenues, setMenus]);

  return {
    dialogState,
    openRandomAllDialog,
    openRandomOneDialog,
    openAddMenuDialog,
    openDeleteMenuDialog,
    closeDialog,
    menus,
    categories,
    weeklyMenu,
    addMenu,
    deleteMenu,
    randomAll,
    randomOne,
    updateScheduledMenu,
  };
};

export default useMenuOperation;
