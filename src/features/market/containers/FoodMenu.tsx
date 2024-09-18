import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Box, IconButton } from '@mui/material';
import WeeklyMenu from 'features/market/components/WeeklyMenu';
import WeeklyMenuCreateDialog from 'features/market/containers/WeeklyMenuCreateDialog';
import WeeklyMenuDeleteDialog from 'features/market/containers/WeeklyMenuDeleteDialog';
import useWeeklyMenuOperation from 'hooks/market/useWeeklyMenuOperation';

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
    </Box>
  );
};

export default FoodMenuContainer;
