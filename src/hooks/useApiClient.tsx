import { useContext } from 'react';

import { ApiClient } from 'api/ApiClient';
import { ApiClientContext } from 'lib/ApiClientContext.ts';

export const useApiClient = (): ApiClient => {
  const context = useContext(ApiClientContext);
  if (!context) {
    throw new Error('useApiClient must be used within an ApiClientProvider');
  }
  return context;
};
