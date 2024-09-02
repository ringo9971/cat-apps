import { Box,  Grid } from '@mui/material';

import { SelectAppCard } from "../components/SelectAppCard/SelectAppCard";

export const MainPage = () => (
      <Box>
      <Grid container spacing={2}>
        <SelectAppCard item="お天気" to="/weather" />
      </Grid>
    </Box>
);

export default MainPage;
