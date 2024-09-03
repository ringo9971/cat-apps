import WeatherPage from 'features/weather/routes/WeatherPage';
import MainPage from 'pages/MainPage';
import { RouteObject } from 'react-router-dom';


const routes: RouteObject[] = [
  {
    children: [
      { path: '/', element: <MainPage /> },
      { path: '/weather', element: <WeatherPage /> },
    ],
  },
];

export default routes;
