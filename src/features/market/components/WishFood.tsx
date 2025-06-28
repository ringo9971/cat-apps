import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import { Box, Card, CardContent, IconButton } from '@mui/material';
import { type WishFood } from 'types/market/FoodMenu';

interface WishFoodProps {
  foods: Array<WishFood>;
  openCreateDialog: () => void;
  openDeleteDialog: (food: WishFood) => void;
  openMoveWeeklyMenuDialog: (food: WishFood) => void;
}

const WishFood = ({
  foods,
  openCreateDialog,
  openDeleteDialog,
  openMoveWeeklyMenuDialog,
}: WishFoodProps): JSX.Element => {
  return (
    <Box>
      <Box display="flex" alignItems="center">
        <Box mx={2}>メモ</Box>
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
      {foods.map((food) => (
        <Card
          key={food.id}
          sx={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <CardContent>{food.name}</CardContent>
          <Box display="flex" justifyContent="flex-end" sx={{ flexGrow: 1 }}>
            <IconButton onClick={() => openMoveWeeklyMenuDialog(food as WishFood)}>
              <ImportExportIcon />
            </IconButton>
            <IconButton onClick={() => openDeleteDialog(food as WishFood)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Card>
      ))}
    </Box>
  );
};

export default WishFood;
