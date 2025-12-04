import AddMenuDialog from '@/features/market/containers/Menu/AddMenuDialog';
import DeleteMenuDialog from '@/features/market/containers/Menu/DeleteMenuDialog';
import MenuList from '@/features/market/containers/Menu/MenuList';
import RandomSelectAllDialog from '@/features/market/containers/Menu/RandomSelectAllDialog';
import RandomSelectOneDialog from '@/features/market/containers/Menu/RandomSelectOneDialog';
import WeeklyMenu from '@/features/market/containers/Menu/WeeklyMenu';
import useMenuOperation from '@/hooks/market/useMenuOperation.ts';
import { Box } from '@mui/material';

export const MenuContainer = () => {
  const {
    menus,
    categories,
    weeklyMenu,
    randomAll,
    randomOne,
    updateScheduledMenu,
    addMenu,
    deleteMenu,
    dialogState,
    openRandomAllDialog,
    openRandomOneDialog,
    openAddMenuDialog,
    openDeleteMenuDialog,
    closeDialog,
  } = useMenuOperation();

  return (
    <Box>
      <WeeklyMenu
        weeklyMenu={weeklyMenu}
        openRandomAll={openRandomAllDialog}
        openRandomOne={openRandomOneDialog}
      />
      {dialogState.open == 'randomAll' && (
        <RandomSelectAllDialog
          open
          onClose={closeDialog}
          randomAll={randomAll}
        />
      )}
      {dialogState.open == 'randomOne' && (
        <RandomSelectOneDialog
          open
          onClose={closeDialog}
          menus={menus}
          categories={categories}
          date={dialogState.date}
          randomOne={randomOne}
          updateScheduledMenu={updateScheduledMenu}
        />
      )}
      <MenuList
        menus={menus}
        openAddMenuDialog={openAddMenuDialog}
        openDeleteMenuDialog={openDeleteMenuDialog}
      />
      {dialogState.open == 'addMenu' && (
        <AddMenuDialog
          open
          onClose={closeDialog}
          addMenu={addMenu}
          categories={categories}
        />
      )}
      {dialogState.open == 'deleteMenu' && (
        <DeleteMenuDialog
          open
          onClose={closeDialog}
          deleteMenu={deleteMenu}
          menu={dialogState.menu}
        />
      )}
    </Box>
  );
};

export default MenuContainer;
