import { useApiClient } from 'hooks/useApiClient';
import { useCallback, useEffect, useState } from 'react';
import { WishFood } from 'types/market/FoodMenu';

interface UseFoodMenuOperationState {
  wishFoods: Array<WishFood>;
}

const useFoodMenuOperation = (): UseFoodMenuOperationState => {
  const apiClient = useApiClient();

  const [wishFoods, setWishFoods] = useState<Array<WishFood>>([]);

  const getWishFoods = useCallback(async (): Promise<Array<WishFood>> => {
    const res = await apiClient.getList<Array<WishFood>>('market', 'wishFood');
    return res;
  }, [apiClient]);

  useEffect(() => {
    const fetch = async () => {
      const res = await getWishFoods();
      setWishFoods(res);
    };
    fetch();
  }, [getWishFoods, setWishFoods]);

  return {
    wishFoods,
  };
};

export default useFoodMenuOperation;
