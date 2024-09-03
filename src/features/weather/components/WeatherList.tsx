import { Box } from '@mui/material';
import WeatherCard from 'features/weather/components/WeatherCard';
import { Weather } from 'types/weather/Weather';

interface WeatherListProps {
  weathers: ReadonlyArray<Weather>;
}

export const WeatherList = ({ weathers }: WeatherListProps): JSX.Element => (
  <Box>
    {weathers.map((weather) => (
      <Box key={weather.title}>
        <WeatherCard weather={weather} />
      </Box>
    ))}
  </Box>
);

export default WeatherList;
