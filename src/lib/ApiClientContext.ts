import { createContext } from 'react';

import { ApiClient } from 'api/ApiClient';

export const ApiClientContext = createContext<ApiClient | null>(null);
