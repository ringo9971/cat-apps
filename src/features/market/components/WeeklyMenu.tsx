import DeleteIcon from '@mui/icons-material/Delete';
import RedoIcon from '@mui/icons-material/Redo';
import { Box, Card, CardContent, IconButton } from '@mui/material';
import { WeeklyMenu, FoodMenu } from 'types/market/FoodMenu';

const getColor = (id: number) => {
  switch (id) {
    case 0:
      return 'lightsteelblue';
    case 1:
      return 'coral';
    case 2:
      return 'lightblue';
    case 3:
      return 'lightgreen';
    case 4:
      return 'khaki';
    case 5:
      return 'peru';
    case 6:
      return 'purple';
    default:
      return null;
  }
};

const getWeekly = (id: number): string => {
  const weekly = ['月', '火', '水', '木', '金', '土', '日'];
  return weekly[id];
};

interface MenuComponentProps {
  id: number;
  menu: FoodMenu;
  openMoveWishFoodDialog: (day: number, menu: string) => void;
  openDeleteDialog: (day: number, menu: string) => void;
}

const MenuComponent = ({
  id,
  menu,
  openDeleteDialog,
  openMoveWishFoodDialog,
}: MenuComponentProps) => (
  <Card
    sx={{
      display: 'flex',
      flexDirection: 'row',
    }}
  >
    <Box
      sx={{
        width: 32,
        backgroundColor: getColor(id),
        border: '1px solid',
        borderColor: 'gray',
      }}
      textAlign="center"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      {getWeekly(id)}
    </Box>
    <Box display="flex" flexDirection="column" width="100%">
      {menu.menus.map((m) => (
        <Box display="flex" flexDirection="row" key={m}>
          <CardContent>{m}</CardContent>
          {m !== '' && (
            <Box display="flex" justifyContent="flex-end" sx={{ flexGrow: 1 }}>
              <IconButton onClick={() => openMoveWishFoodDialog(id, m)}>
                <RedoIcon />
              </IconButton>
              <IconButton onClick={() => openDeleteDialog(id, m)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          )}
        </Box>
      ))}
    </Box>
  </Card>
);

interface WeeklyMenuComponentProps {
  menu: WeeklyMenu;
  openMoveWishFoodDialog: (day: number, menu: string) => void;
  openDeleteDialog: (day: number, menu: string) => void;
}

const WeeklyMenuComponent = ({
  menu,
  openMoveWishFoodDialog,
  openDeleteDialog,
}: WeeklyMenuComponentProps): JSX.Element => {
  return (
    <Box>
      <MenuComponent
        id={0}
        menu={menu.mon}
        openMoveWishFoodDialog={openMoveWishFoodDialog}
        openDeleteDialog={openDeleteDialog}
      />
      <MenuComponent
        id={1}
        menu={menu.tue}
        openMoveWishFoodDialog={openMoveWishFoodDialog}
        openDeleteDialog={openDeleteDialog}
      />
      <MenuComponent
        id={2}
        menu={menu.wed}
        openMoveWishFoodDialog={openMoveWishFoodDialog}
        openDeleteDialog={openDeleteDialog}
      />
      <MenuComponent
        id={3}
        menu={menu.thu}
        openMoveWishFoodDialog={openMoveWishFoodDialog}
        openDeleteDialog={openDeleteDialog}
      />
      <MenuComponent
        id={4}
        menu={menu.fri}
        openMoveWishFoodDialog={openMoveWishFoodDialog}
        openDeleteDialog={openDeleteDialog}
      />
      <MenuComponent
        id={5}
        menu={menu.sat}
        openMoveWishFoodDialog={openMoveWishFoodDialog}
        openDeleteDialog={openDeleteDialog}
      />
      <MenuComponent
        id={6}
        menu={menu.sun}
        openMoveWishFoodDialog={openMoveWishFoodDialog}
        openDeleteDialog={openDeleteDialog}
      />
    </Box>
  );
};

export default WeeklyMenuComponent;
