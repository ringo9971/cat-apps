import { Box, Tab, Tabs } from '@mui/material';
import FoodMenuContainer from 'features/market/containers/FoodMenu';
import ToDoListContainer from 'features/market/containers/ToDoList';
import WishListContainer from 'features/market/containers/WishList';
import { useState } from 'react';

export const MarketPage = (): JSX.Element => {
  const [tabpage, setTabpage] = useState(0);

  return (
    <Box>
      <Tabs value={tabpage} onChange={(_, newValue) => setTabpage(newValue)}>
        <Tab label="買い物" />
        <Tab label="献立" />
        <Tab label="ToDo" />
      </Tabs>
      <Box>
        {tabpage === 0 && <WishListContainer />}
        {tabpage === 1 && <FoodMenuContainer />}
        {tabpage === 2 && <ToDoListContainer />}
      </Box>
    </Box>
  );
};

export default MarketPage;
