import { useApiClient } from 'hooks/useApiClient';
import { useCallback, useEffect, useState } from 'react';
import { WeeklyMenu } from 'types/market/FoodMenu';

type DialogState =
  | {
      open: null;
    }
  | {
      open: 'create';
    }
  | {
      open: 'delete';
      day: number;
      menu: string;
    };

interface UseWeeklyMenuOperationState {
  weeklyMenu: WeeklyMenu;
  dialogState: DialogState;
  openCreateDialog: () => void;
  openDeleteDialog: (day: number, menu: string) => void;
  closeDialog: () => void;
  addMenu: (d: number, menu: string) => Promise<WeeklyMenu>;
  deleteMenu: (d: number, menu: string) => Promise<WeeklyMenu>;
}

const daysOfWeek: Array<keyof WeeklyMenu> = [
  'mon',
  'tue',
  'wed',
  'thu',
  'fri',
  'sat',
  'sun',
];

const useWeeklyMenuOperation = (): UseWeeklyMenuOperationState => {
  const apiClient = useApiClient();

  const [dialogState, setDialogState] = useState<DialogState>({ open: null });
  const [weeklyMenu, setWeeklyMenu] = useState<WeeklyMenu>({
    mon: { menus: [''] },
    tue: { menus: [''] },
    wed: { menus: [''] },
    thu: { menus: [''] },
    fri: { menus: [''] },
    sat: { menus: [''] },
    sun: { menus: [''] },
  });

  const openCreateDialog = () => {
    setDialogState({ open: 'create' });
  };

  const openDeleteDialog = (day: number, menu: string) => {
    setDialogState({ open: 'delete', day, menu });
  };

  const closeDialog = () => {
    setDialogState({ open: null });
  };

  const getWeeklyMenu = useCallback(async (): Promise<WeeklyMenu | null> => {
    const res = await apiClient.get<WeeklyMenu>('market', 'weeklyMenu');
    return res;
  }, [apiClient]);

  const addMenu = async (d: number, menu: string): Promise<WeeklyMenu> => {
    const updateWeeklyMenu = daysOfWeek.reduce((acc, day, index) => {
      const menus = weeklyMenu[day].menus.filter((m) => m !== '');
      acc[day] = {
        menus: index === d ? [...menus, menu] : menus,
      };
      return acc;
    }, {} as WeeklyMenu);

    const res = await apiClient.update<WeeklyMenu>(
      'market',
      'weeklyMenu',
      updateWeeklyMenu
    );
    setWeeklyMenu(res);
    return res;
  };

  const deleteMenu = async (d: number, menu: string): Promise<WeeklyMenu> => {
    const updateWeeklyMenu = daysOfWeek.reduce((acc, day) => {
      const menus = weeklyMenu[day].menus.filter(
        (m) => m !== '' && !(day === daysOfWeek[d] && m === menu)
      );
      acc[day] = { menus };
      return acc;
    }, {} as WeeklyMenu);

    const res = await apiClient.update<WeeklyMenu>(
      'market',
      'weeklyMenu',
      updateWeeklyMenu
    );
    setWeeklyMenu(res);
    return res;
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await getWeeklyMenu();
      if (res === null) return;
      const menu = daysOfWeek.reduce((acc, day) => {
        acc[day] = {
          menus: res[day].menus.length !== 0 ? res[day].menus : [''],
        };
        return acc;
      }, {} as WeeklyMenu);
      setWeeklyMenu(menu);
    };
    fetch();
  }, [getWeeklyMenu, setWeeklyMenu]);

  return {
    weeklyMenu,
    dialogState,
    openCreateDialog,
    openDeleteDialog,
    closeDialog,
    addMenu,
    deleteMenu,
  };
};

export default useWeeklyMenuOperation;
