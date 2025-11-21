import { type Menu } from '@/types/market/Menu.ts';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Card,
  CardContent,
  Divider,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';

interface MenuCategoryGroup {
  category: string;
  menus: ReadonlyArray<Menu & { color: string }>;
}

interface MenuItemProps {
  group: MenuCategoryGroup;
  openDeleteMenuDialog: (menu: Menu) => void;
}

export const MenuItem = ({ group, openDeleteMenuDialog }: MenuItemProps) => (
  <Box>
    <Typography>{group.category}</Typography>
    {group.menus.map((menu) => (
      <Card
        key={menu.id}
        sx={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'stretch',
            flexGrow: 1,
          }}
        >
          <Box
            sx={{
              width: 16,
              backgroundColor: menu.color,
            }}
          />
          <CardContent>{menu.name}</CardContent>
          <Box flexGrow={1} />
          <IconButton onClick={() => openDeleteMenuDialog(menu)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </Card>
    ))}
  </Box>
);

interface MenuListProps {
  groups: ReadonlyArray<MenuCategoryGroup>;
  openAddMenuDialog: () => void;
  openDeleteMenuDialog: (menu: Menu) => void;
}

const MenuList = ({
  groups,
  openAddMenuDialog,
  openDeleteMenuDialog,
}: MenuListProps) => {
  return (
    <Box>
      <Box display="flex" pt={2} px={2} alignItems="center">
        <Typography variant="h6" gutterBottom>
          献立一覧
        </Typography>
        <Box flexGrow={1} />
        <IconButton onClick={openAddMenuDialog}>
          <AddIcon />
        </IconButton>
      </Box>
      <Divider sx={{ my: 1 }} />
      <Stack spacing={2}>
        {groups.map((group) => (
          <MenuItem
            key={group.category}
            group={group}
            openDeleteMenuDialog={openDeleteMenuDialog}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default MenuList;
