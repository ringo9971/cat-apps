import Component from 'features/market/components/WishItemCreateDialog';
import { useState } from 'react';
import { CreateWishItem, WishItem } from 'types/market/WishItem';

interface WishItemCreateDialogProps {
  open: boolean;
  onClose: () => void;
  createWishItem: (wishItem: CreateWishItem) => Promise<WishItem>;
}

export const WishItemCreateDialog = ({
  open,
  onClose,
  createWishItem,
}: WishItemCreateDialogProps): JSX.Element => {
  const [wishItem, setWishItem] = useState<CreateWishItem>({
    name: '',
    tag: '食品',
  });

  const updateWishItem = (name?: string, tag?: string) => {
    setWishItem((w) => ({ name: name ?? w.name, tag: tag ?? w.tag }));
  };

  const onCreateWishItem = async () => {
    await createWishItem(wishItem);
    onClose();
  };

  return (
    <Component
      open={open}
      onClose={onClose}
      onCreateClick={onCreateWishItem}
      wishItem={wishItem}
      updateWishItem={updateWishItem}
    />
  );
};

export default WishItemCreateDialog;
