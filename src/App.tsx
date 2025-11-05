import routes from './Routes';
import TopBar from './TopBar';
import { ApiClientProvider } from 'lib/ApiClientProvider';
import { useRoutes } from 'react-router-dom';

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
