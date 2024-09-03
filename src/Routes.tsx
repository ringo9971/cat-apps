import MainPage from 'pages/MainPage';
import { RouteObject } from 'react-router-dom';


const routes: RouteObject[] = [
  {
    children: [
      { path: '/', element: <MainPage /> },
    ],
  },
];

export default routes;
