import { ApiClientProvider } from 'lib/ApiClientContext';
import { useRoutes } from 'react-router-dom';

import routes from './Routes';
import TopBar from './TopBar';

function App() {
  const routing = useRoutes(routes);

  return (
    <ApiClientProvider>
      <TopBar />
      {routing}
    </ApiClientProvider>
  );
}

export default App;
