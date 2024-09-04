import { Logout } from '@mui/icons-material';
import {
  Button,
  Box,
  AppBar,
  Toolbar,
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
} from '@mui/material';
import { useLogout } from 'hooks/firebase/useLogout';
import { useUser } from 'hooks/firebase/useUser';
import { useState, MouseEvent } from 'react';
import { Link } from 'react-router-dom';

const TopBar = (): JSX.Element => {
  const { user, loading } = useUser();
  const { logout } = useLogout();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box mb={1}>
      <AppBar position="static">
        <Toolbar>
          <Box flexGrow="1">
            <Button component={Link} to="/" color="inherit">
              cat-apps
            </Button>
          </Box>
          {user ? (
            <Box>
              <Box>
                <Tooltip title="アカウント設定">
                  <IconButton onClick={handleClick}>
                    <Avatar />
                  </IconButton>
                </Tooltip>
              </Box>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
              >
                <MenuItem onClick={logout}>
                  <ListItemIcon>
                    <Logout />
                  </ListItemIcon>
                  ログアウト
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            !loading && (
              <Button component={Link} to="/login" color="inherit">
                ログインはこちらから
              </Button>
            )
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default TopBar;
