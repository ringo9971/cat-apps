import { Box } from '@mui/material';
import CityAutoComplete from 'features/weather/components/CityAutoComplete';
import { WeatherList } from 'features/weather/components/WeatherList';
import useCitiesMaster from 'hooks/weather/useCitiesMaster';
import useCitiesOpeartion from 'hooks/weather/useCitiesOperation';
import useWeather from 'hooks/weather/useWeather';
import { useState } from 'react';

export const WeatherListContainer = (): JSX.Element => {
  const { cities, addCity } = useCitiesOpeartion();
  const { weathers, fetchWeather } = useWeather({ cities });

  const { citiesMaster } = useCitiesMaster();
  const [text, setText] = useState('');

  const handleAddCity = (cityName: string) => {
    const city = addCity(cityName);
    if (city == null) return;
    fetchWeather(city);
  };

  return (
    <Box>
      <Box mb={2}>
        <CityAutoComplete
          text={text}
          setText={setText}
          citiesMaster={citiesMaster}
          addCity={handleAddCity}
        />
      </Box>
      <WeatherList weathers={weathers} />
    </Box>
  );
};

export default WeatherListContainer;
