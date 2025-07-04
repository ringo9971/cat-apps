import AuthRoute from 'components/AuthRoute';
import MarketPage from 'features/market/routes/MarketPage';
import { PrefectureQuizPage } from 'features/prefecture-quiz/routes/PrefectureQuizPage';
import WeatherPage from 'features/weather/routes/WeatherPage';
import LoginPage from 'pages/LoginPage';
import MainPage from 'pages/MainPage';
import { RouteObject } from 'react-router-dom';

const routes: RouteObject[] = [
  {
    children: [
      { path: '/', element: <MainPage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/weather', element: <WeatherPage /> },
      { path: '/market', element: <AuthRoute element={<MarketPage />} /> },
      { path: '/prefecture-quiz', element: <PrefectureQuizPage /> },
    ],
  },
];

export default routes;
