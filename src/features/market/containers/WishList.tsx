import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Box, IconButton, TextField } from '@mui/material';
import WishList from 'features/market/components/WishList';
import WishItemCreateDialog from 'features/market/containers/WishItemCreateDialog';
import WishItemDeleteDialog from 'features/market/containers/WishItemDeleteDialog';
import useWishItemsOperation from 'hooks/market/useWishItemsOperation';

export const WishListContainer = (): JSX.Element => {
  const {
    dialogState,
    openCreateDialog,
    openDeleteDialog,
    closeDialog,
    toggleWishItem,
  } = useWishItemsOperation();

  const wishList = [
    {
      id: '0',
      time: new Date(),
      name: 'うどん',
      tag: '食材',
      check: false,
    },
    {
      id: '1',
      time: new Date(),
      name: 'そば',
      tag: '食材',
      check: true,
    },
    {
      id: '2',
      time: new Date(),
      name: 'トイレットペーパー',
      tag: '日用品',
      check: true,
    },
    {
      id: '3',
      time: new Date(),
      name: '冷蔵庫',
      tag: '家具家電',
      check: false,
    },
  ];

  return (
    <Box>
      <Box display="flex" alignItems="center">
        <TextField placeholder="検索" size="small" sx={{ my: 2 }} />
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
      <WishList
        wishList={wishList}
        onDelete={openDeleteDialog}
        onCheck={toggleWishItem}
      />
      {dialogState.open === 'create' && (
        <WishItemCreateDialog open onClose={closeDialog} />
      )}
      {dialogState.open === 'delete' && (
        <WishItemDeleteDialog
          open
          onClose={closeDialog}
          wishItem={dialogState.wishItem}
        />
      )}
    </Box>
  );
};

export default WishListContainer;
