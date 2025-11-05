import { Box } from '@mui/material';
import RefrigeratorList from 'features/market/components/RefrigeratorList';
import WishItemDeleteDialog from 'features/market/containers/WishItemDeleteDialog';
import { UseWishItemsOperationState } from 'hooks/market/useWishItemsOperation';
import { WishItem } from 'types/market/WishItem';

export const RefrigeratorContainer = ({
  refrigeratorList,
  dialogState,
  openDeleteDialog,
  closeDialog,
  deleteWishItem,
  toggleAndMoveWishItem,
}: Pick<
  UseWishItemsOperationState,
  | 'refrigeratorList'
  | 'dialogState'
  | 'openDeleteDialog'
  | 'closeDialog'
  | 'deleteWishItem'
  | 'toggleAndMoveWishItem'
>): JSX.Element => {
  const handleDelete = (wishItem: WishItem) => {
    openDeleteDialog(wishItem, 'refrigeratorList');
  };

  const handleMoveToWishList = async (wishItem: WishItem) => {
    await toggleAndMoveWishItem(wishItem);
  };

  return (
    <Box>
      <RefrigeratorList
        refrigeratorList={refrigeratorList}
        onDelete={handleDelete}
        onMoveToWishList={handleMoveToWishList}
      />
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

export default RefrigeratorContainer;
