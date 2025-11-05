import { useMemo } from 'react';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Box, IconButton, TextField } from '@mui/material';
import WishList from 'features/market/components/WishList';
import WishItemCreateDialog from 'features/market/containers/WishItemCreateDialog';
import WishItemDeleteDialog from 'features/market/containers/WishItemDeleteDialog';
import { UseWishItemsOperationState } from 'hooks/market/useWishItemsOperation';

export const WishListContainer = ({
  wishList,
  dialogState,
  openCreateDialog,
  openDeleteDialog,
  closeDialog,
  createWishItem,
  deleteWishItem,
  toggleAndMoveWishItem,
  sortWishList,
}: Pick<
  UseWishItemsOperationState,
  | 'wishList'
  | 'dialogState'
  | 'openCreateDialog'
  | 'openDeleteDialog'
  | 'closeDialog'
  | 'createWishItem'
  | 'deleteWishItem'
  | 'toggleAndMoveWishItem'
  | 'sortWishList'
>): JSX.Element => {
  const isMobile = useMemo(
    () => window.matchMedia('(pointer: coarse)').matches,
    []
  );

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
        isMobile={isMobile}
        wishList={wishList}
        onDelete={openDeleteDialog}
        onCheck={toggleAndMoveWishItem}
        onDragEnd={sortWishList}
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
          listType={dialogState.listType}
        />
      )}
    </Box>
  );
};

export default WishListContainer;
