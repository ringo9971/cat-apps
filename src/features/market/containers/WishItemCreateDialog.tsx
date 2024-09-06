import Component from 'features/market/components/WishItemCreateDialog';
import useWishItemsOperation from 'hooks/market/useWishItemsOperation';
import { useState } from 'react';
import { CreateWishItem } from 'types/market/WishItem';

interface WishItemCreateDialogProps {
  open: boolean;
  onClose: () => void;
}

export const WishItemCreateDialog = ({
  open,
  onClose,
}: WishItemCreateDialogProps): JSX.Element => {
  const { createWishItem } = useWishItemsOperation();
  const [wishItem, setWishItem] = useState<CreateWishItem>({
    name: '',
    tag: '食品',
  });

  const updateWishItem = (name?: string, tag?: string) => {
    setWishItem({ name: name ?? '', tag: tag ?? '食品' });
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
