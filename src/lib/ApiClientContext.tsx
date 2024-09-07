import { ApiClient } from 'api/ApiClient';
import useFirebase from 'hooks/firebase/useFirebase';
import { createContext, ReactNode } from 'react';

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
