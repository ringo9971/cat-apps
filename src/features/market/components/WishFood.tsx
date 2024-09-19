import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Card, CardContent, IconButton } from '@mui/material';
import { WishFood } from 'types/market/FoodMenu';

interface WishFoodComponentProps {
  foods: Array<WishFood>;
  openCreateDialog: () => void;
}

const WishFoodComponent = ({
  foods,
  openCreateDialog,
}: WishFoodComponentProps): JSX.Element => {
  return (
    <Box>
      <Box display="flex" alignItems="center">
        ＜食べたいもの＞
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
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Card>
      ))}
    </Box>
  );
};

export default WishFoodComponent;
