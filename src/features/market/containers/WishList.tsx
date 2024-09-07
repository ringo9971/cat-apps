import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Box, IconButton, TextField } from '@mui/material';
import WishList from 'features/market/components/WishList';
import WishItemCreateDialog from 'features/market/containers/WishItemCreateDialog';
import WishItemDeleteDialog from 'features/market/containers/WishItemDeleteDialog';
import useWishItemsOperation from 'hooks/market/useWishItemsOperation';

export const WishListContainer = (): JSX.Element => {
  const {
    wishList,
    dialogState,
    openCreateDialog,
    openDeleteDialog,
    closeDialog,
    createWishItem,
    deleteWishItem,
    toggleWishItem,
  } = useWishItemsOperation();

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
        <WishItemCreateDialog
          open
          onClose={closeDialog}
          createWishItem={createWishItem}
        />
      )}
      {dialogState.open === 'delete' && (
        <WishItemDeleteDialog
          open
          onClose={closeDialog}
          wishItem={dialogState.wishItem}
          deleteWishItem={deleteWishItem}
        />
      )}
    </Box>
  );
};

export default WishListContainer;
