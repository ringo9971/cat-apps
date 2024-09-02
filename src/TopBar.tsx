import { Button, Box, AppBar } from '@mui/material';
import { Link } from 'react-router-dom';

const TopBar = (): JSX.Element => {
  return (
    <Box mb={1}>
      <AppBar position="static">
        <Box flexGrow="1">
          <Button component={Link} to="/" color="inherit">
            cat-apps
          </Button>
        </Box>
      </AppBar>
    </Box>
  );
};

export default TopBar;
