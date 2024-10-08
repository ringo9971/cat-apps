import { ApiClient } from 'api/ApiClient';
import { ApiClientContext } from 'lib/ApiClientContext';
import { useContext } from 'react';

export const useApiClient = (): ApiClient => {
  const context = useContext(ApiClientContext);
  if (!context) {
    throw new Error('useApiClient must be used within an ApiClientProvider');
  }
  return context;
};
