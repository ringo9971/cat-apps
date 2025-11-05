import { ReactNode } from 'react';

import { ApiClientContext } from './ApiClientContext.ts';
import { ApiClient } from '@/api/ApiClient.ts';
import useFirebase from '@/hooks/firebase/useFirebase.ts';

export const ApiClientProvider = ({ children }: { children: ReactNode }) => {
  const { firestore } = useFirebase();
  const apiClient = new ApiClient(firestore);

  return (
    <ApiClientContext.Provider value={apiClient}>
      {children}
    </ApiClientContext.Provider>
  );
};
