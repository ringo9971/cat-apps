import Component from 'features/market/components/WishItemDeleteDialog';
import useWishItemsOperation from 'hooks/market/useWishItemsOperation';
import { WishItem } from 'types/market/WishItem';

interface WishItemDeleteDialogProps {
  open: boolean;
  onClose: () => void;
  wishItem: WishItem;
}

export const WishItemDeleteDialog = ({
  open,
  onClose,
  wishItem,
}: WishItemDeleteDialogProps): JSX.Element => {
  const { deleteWishItem } = useWishItemsOperation();

  const onDeleteWishItem = async () => {
    await deleteWishItem(wishItem);
    onClose();
  };

  return (
    <Component
      open={open}
      onClose={onClose}
      onDeleteClick={onDeleteWishItem}
      wishItem={wishItem}
    />
  );
};

export default WishItemDeleteDialog;
