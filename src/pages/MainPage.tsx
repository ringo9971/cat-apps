import { Box, Grid } from '@mui/material';

import { SelectAppCard } from 'components/SelectAppCard';
import { useUser } from 'hooks/firebase/useUser';

export const MainPage = () => {
  const { user } = useUser();

  return (
    <Box>
      <Grid container spacing={2}>
        <SelectAppCard item="お天気" to="/weather" />
        <SelectAppCard item="お買い物" to="/market" disabled={user == null} />
      </Grid>
    </Box>
  );
};

export default MainPage;
