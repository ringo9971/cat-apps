import { useCallback } from 'react';

import Component from '@/features/market/components/Menu/RandomSelectAllDialog.tsx';

export interface RandomSelectAllDialogProps {
  open: boolean;
  onClose: () => void;
  randomAll: () => void;
}

const RandomSelectAllDialog = ({
  open,
  onClose,
  randomAll,
}: RandomSelectAllDialogProps) => {
  const handleClickRandom = useCallback((): void => {
    randomAll();
    onClose();
  }, [randomAll, onClose]);

  return (
    <Component
      open={open}
      onClose={onClose}
      handleClickRandom={handleClickRandom}
    />
  );
};

export default RandomSelectAllDialog;
