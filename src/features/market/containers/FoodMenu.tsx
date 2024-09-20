import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Box, IconButton } from '@mui/material';
import WeeklyMenu from 'features/market/components/WeeklyMenu';
import WishFood from 'features/market/components/WishFood';
import MoveWeeklyMenuDialog from 'features/market/containers/MoveWeeklyMenuDialog';
import MoveWishFoodDialog from 'features/market/containers/MoveWishFoodDialog';
import WeeklyMenuCreateDialog from 'features/market/containers/WeeklyMenuCreateDialog';
import WeeklyMenuDeleteDialog from 'features/market/containers/WeeklyMenuDeleteDialog';
import WishFoodCreateDialog from 'features/market/containers/WishFoodCreateDialog';
import useMoveDialog from 'hooks/market/useMoveDialog';
import useWeeklyMenuOperation from 'hooks/market/useWeeklyMenuOperation';
import useFoodMenuOperation from 'hooks/market/useWishFoodOperation';

export const FoodMenuContainer = (): JSX.Element => {
  const {
    weeklyMenu,
    dialogState,
    openCreateDialog,
    openDeleteDialog,
    closeDialog,
    addMenu,
    deleteMenu,
  } = useWeeklyMenuOperation();
  const {
    wishFoods,
    dialogState: foodDialogState,
    openCreateDialog: openFoodCreateDialog,
    closeDialog: closeFoodDialog,
    addFood,
    deleteFood,
  } = useFoodMenuOperation();
  const {
    dialogState: moveDialogState,
    openToWeeklyMenuDialog,
    openToWishFoodDialog,
    closeDialog: closeMoveDialog,
  } = useMoveDialog();

  return (
    <Box>
      <Box display="flex" alignItems="center">
        <Box display="flex" justifyContent="flex-end" sx={{ flexGrow: 1 }}>
          <IconButton onClick={openCreateDialog}>
            <AddCircleOutlineIcon
              sx={{
                color: 'blue',
                fontSize: 40,
              }}
            />
          </IconButton>
        </Box>
      </Box>
      <WeeklyMenu
        menu={weeklyMenu}
        openMoveWishFoodDialog={openToWishFoodDialog}
        openDeleteDialog={openDeleteDialog}
      />
      <WeeklyMenuCreateDialog
        open={dialogState.open === 'create'}
        onClose={closeDialog}
        addMenu={addMenu}
      />
      {dialogState.open === 'delete' && (
        <WeeklyMenuDeleteDialog
          open={dialogState.open === 'delete'}
          onClose={closeDialog}
          day={dialogState.day}
          menu={dialogState.menu}
          deleteMenu={deleteMenu}
        />
      )}
      <WishFood
        foods={wishFoods}
        openCreateDialog={openFoodCreateDialog}
        openMoveWeeklyMenuDialog={openToWeeklyMenuDialog}
      />
      <WishFoodCreateDialog
        open={foodDialogState.open === 'create'}
        onClose={closeFoodDialog}
        createWishFood={addFood}
      />
      {moveDialogState.open === 'toWishFood' && (
        <MoveWishFoodDialog
          open={moveDialogState.open === 'toWishFood'}
          onClose={closeMoveDialog}
          day={moveDialogState.day}
          menu={moveDialogState.menu}
          addFood={addFood}
          deleteWeeklyMenu={deleteMenu}
        />
      )}
      {moveDialogState.open === 'toWeeklyMenu' && (
        <MoveWeeklyMenuDialog
          open={moveDialogState.open === 'toWeeklyMenu'}
          onClose={closeMoveDialog}
          food={moveDialogState.food}
          addMenu={addMenu}
          deleteWishFood={deleteFood}
        />
      )}
    </Box>
  );
};

export default FoodMenuContainer;
