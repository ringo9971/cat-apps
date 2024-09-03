import { getWeather } from 'api/weather/getWeather';
import { useEffect, useState } from 'react';
import { City } from 'types/weather/City';
import { Weather } from 'types/weather/Weather';

interface WeatherState {
  weathers: Array<Weather>;
  fetchWeather: (city: City) => Promise<Weather>;
}

interface WeatherOperationProps {
  cities: ReadonlyArray<City>;
}

const useCitiesOpeartion = ({
  cities,
}: WeatherOperationProps): WeatherState => {
  const [weathers, setWeathers] = useState<Array<Weather>>([]);

  useEffect(() => {
    const fetchWeather = async () => {
      const weathers = await Promise.all(
        cities.map(({ id }) => getWeather(id))
      );
      setWeathers(weathers);
    };
    fetchWeather();
  }, [cities]);

  const fetchWeather = async (city: City): Promise<Weather> => {
    const weather = await getWeather(city.id);
    setWeathers((preWeathers) => {
      if (preWeathers.find((w) => w.title === weather.title)) {
        return preWeathers;
      }
      return [...preWeathers, weather];
    });
    return weather;
  };

  return {
    weathers,
    fetchWeather,
  };
};

export default useCitiesOpeartion;
