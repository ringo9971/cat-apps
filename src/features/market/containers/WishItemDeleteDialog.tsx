import Component from 'features/market/components/WishItemDeleteDialog';
import { WishItem } from 'types/market/WishItem';

interface WishItemDeleteDialogProps {
  open: boolean;
  onClose: () => void;
  wishItem: WishItem;
  deleteWishItem: (
    wishItem: WishItem,
    listType: 'wishList' | 'refrigeratorList'
  ) => Promise<WishItem>;
  listType: 'wishList' | 'refrigeratorList';
}

export const WishItemDeleteDialog = ({
  open,
  onClose,
  wishItem,
  deleteWishItem,
  listType,
}: WishItemDeleteDialogProps): JSX.Element => {
  const onDeleteWishItem = async () => {
    await deleteWishItem(wishItem, listType);
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
