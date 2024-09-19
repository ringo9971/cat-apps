import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Box, IconButton } from '@mui/material';
import WeeklyMenu from 'features/market/components/WeeklyMenu';
import WishFood from 'features/market/components/WishFood';
import WeeklyMenuCreateDialog from 'features/market/containers/WeeklyMenuCreateDialog';
import WeeklyMenuDeleteDialog from 'features/market/containers/WeeklyMenuDeleteDialog';
import WishFoodCreateDialog from 'features/market/containers/WishFoodCreateDialog';
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
  } = useFoodMenuOperation();

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
      <WeeklyMenu menu={weeklyMenu} openDeleteDialog={openDeleteDialog} />
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
      <WishFood foods={wishFoods} openCreateDialog={openFoodCreateDialog} />
      <WishFoodCreateDialog
        open={foodDialogState.open === 'create'}
        onClose={closeFoodDialog}
        createWishFood={addFood}
      />
    </Box>
  );
};

export default FoodMenuContainer;
