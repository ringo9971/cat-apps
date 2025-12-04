import {
  DisplayScheduledMenu,
  type DisplayWeeklyMenu,
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

const getBackgroundColor = (datestr: string) => {
  const day = new Date(datestr).getDay();
  if (day === 0) return 'rgba(255, 0, 0, 0.05)'; // 日曜
  if (day === 6) return 'rgba(0, 0, 255, 0.05)'; // 土曜
  return 'transparent';
};

interface WeeklyMenuItemProps {
  menu: DisplayScheduledMenu;
  openRandomOne: (date: string) => void;
}

export const WeeklyMenuItem = ({
  menu,
  openRandomOne,
}: WeeklyMenuItemProps) => (
  <Box
    display="flex"
    alignItems="center"
    py={1}
    key={menu.date}
    sx={{ backgroundColor: getBackgroundColor(menu.date) }}
  >
    <Typography>{menu.displayDate}</Typography>
    <Typography px={2}>{menu.name}</Typography>
    <Box flexGrow={1} />
    <IconButton onClick={() => openRandomOne(menu.date)}>
      <EditIcon />
    </IconButton>
  </Box>
);

interface WeeklyMenuProps {
  weeklyMenu: DisplayWeeklyMenu;
  openRandomAll: () => void;
  openRandomOne: (date: string) => void;
}

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
          <WeeklyMenuItem key={date} menu={m} openRandomOne={openRandomOne} />
        ))}
      </CardContent>
    </Card>
  </Box>
);

export default WeeklyMenu;
