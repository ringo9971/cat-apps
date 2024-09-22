import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import { Box, Card, CardContent, IconButton } from '@mui/material';
import { WishFood } from 'types/market/FoodMenu';

interface WishFoodComponentProps {
  foods: Array<WishFood>;
  openCreateDialog: () => void;
  openDeleteDialog: (food: WishFood) => void;
  openMoveWeeklyMenuDialog: (food: WishFood) => void;
}

const WishFoodComponent = ({
  foods,
  openCreateDialog,
  openDeleteDialog,
  openMoveWeeklyMenuDialog,
}: WishFoodComponentProps): JSX.Element => {
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
          key={JSON.stringify(food.id)}
          sx={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <CardContent>{food.name}</CardContent>
          <Box display="flex" justifyContent="flex-end" sx={{ flexGrow: 1 }}>
            <IconButton onClick={() => openMoveWeeklyMenuDialog(food)}>
              <ImportExportIcon />
            </IconButton>
            <IconButton onClick={() => openDeleteDialog(food)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Card>
      ))}
    </Box>
  );
};

export default WishFoodComponent;
