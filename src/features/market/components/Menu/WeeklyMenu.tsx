import {
  type Menu,
  type ScheduledMenu,
  type WeeklyMenu,
} from '@/types/market/Menu.ts';
import EditIcon from '@mui/icons-material/Edit';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import {
  Box,
  Card,
  CardContent,
  Divider,
  IconButton,
  Typography,
} from '@mui/material';

interface WeeklyMenuProps {
  menus: Menu[];
  weeklyMenu: WeeklyMenu;
  openRandomAll: () => void;
  openRandomOne: (date: string) => void;
}

export const WeeklyMenuItem = ({
  date,
  menu,
  openRandomOne,
}: {
  date: string;
  menu: ScheduledMenu;
  openRandomOne: (date: string) => void;
}) => (
  <Box display="flex" alignItems="center" py={1} key={date}>
    <Typography>{date}</Typography>
    <Typography px={2}>{menu.name}</Typography>
    <Box flexGrow={1} />
    <IconButton onClick={() => openRandomOne(date)}>
      <EditIcon />
    </IconButton>
  </Box>
);

const WeeklyMenu = ({
  weeklyMenu,
  openRandomAll,
  openRandomOne,
}: WeeklyMenuProps) => (
  <Box>
    <Card sx={{ mt: 2 }}>
      <CardContent>
        <Box display="flex">
          <Typography variant="h6" gutterBottom>
            今週の献立
          </Typography>
          <Box flexGrow={1} />
          <IconButton onClick={openRandomAll}>
            <ShuffleIcon />
          </IconButton>
        </Box>
        <Divider sx={{ my: 1 }} />
        {Array.from(weeklyMenu.menus.entries()).map(([date, m]) => (
          <WeeklyMenuItem
            key={date}
            date={date}
            menu={m}
            openRandomOne={openRandomOne}
          />
        ))}
      </CardContent>
    </Card>
  </Box>
);

export default WeeklyMenu;
