import { ReactNode, createContext } from 'react';

import { ApiClient } from 'api/ApiClient';
import useFirebase from 'hooks/firebase/useFirebase';

export const ApiClientContext = createContext<ApiClient | null>(null);

export const ApiClientProvider = ({ children }: { children: ReactNode }) => {
  const { firestore } = useFirebase();
  const apiClient = new ApiClient(firestore);

  return (
    <ApiClientContext.Provider value={apiClient}>
      {children}
    </ApiClientContext.Provider>
  );
};
