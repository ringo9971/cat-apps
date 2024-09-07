import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Box, IconButton, TextField } from '@mui/material';
import WishList from 'features/market/components/WishList';
import WishItemCreateDialog from 'features/market/containers/WishItemCreateDialog';
import WishItemDeleteDialog from 'features/market/containers/WishItemDeleteDialog';
import useWishItemsOperation from 'hooks/market/useWishItemsOperation';
import { useMemo } from 'react';
import { WishItem } from 'types/market/WishItem';

const sortByTag = (a: WishItem, b: WishItem) => {
  const order = ['食品', '日用品', '家具家電'];
  const indexA = order.indexOf(a.tag);
  const indexB = order.indexOf(b.tag);

  if (indexA === -1) return 1;
  if (indexB === -1) return -1;

  return indexA - indexB;
};

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

  const sortedWishList = useMemo(() => wishList.sort(sortByTag), [wishList]);

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
        wishList={sortedWishList}
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
