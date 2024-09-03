import { Weather, WeatherCondition } from 'types/weather/Weather';

const telopToWeatherCondition = (telop: string, regex: RegExp) => {
  const match = regex.exec(telop);
  if (match) {
    const a = match[0];
    if (a.endsWith('晴')) {
      return WeatherCondition.Sunny;
    } else if (a.endsWith('曇')) {
      return WeatherCondition.Cloudy;
    } else if (a.endsWith('雨')) {
      return WeatherCondition.Rainy;
    }
  }
};

const telopToForecastWeatherCondition = (telop: string) => {
  const main = telopToWeatherCondition(telop, /./);
  const later = telopToWeatherCondition(telop, /のち./);
  const sometimes = telopToWeatherCondition(telop, /時々./);
  return { main, later, sometimes };
};

const calculateChanceOfRain = (chanceOfRain: {
  T00_06: string;
  T06_12: string;
  T12_18: string;
  T18_24: string;
}) => {
  const regex = /\d+/;
  const chances: number[] = [];

  for (const key in chanceOfRain) {
    if (Object.prototype.hasOwnProperty.call(chanceOfRain, key)) {
      const chanceString = chanceOfRain[key as keyof typeof chanceOfRain];
      const match = regex.exec(chanceString);
      if (match) {
        chances.push(Number(match[0]));
      }
    }
  }

  if (chances.length === 0) {
    return '-';
  }
  const average =
    chances.reduce((sum, chance) => sum + chance, 0) / chances.length;
  return average.toFixed(0);
};

export const getWeather = async (id: string): Promise<Weather> => {
  const storedWeatherData = localStorage.getItem(`weather_${id}`);

  if (storedWeatherData) {
    const { date, weather } = JSON.parse(storedWeatherData);

    const currentDate = new Date().toDateString();
    if (date === currentDate) {
      return weather;
    }
  }

  const response = await fetch(
    `https://weather.tsukumijima.net/api/forecast/city/${id}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  const jsonData = await response.json();

  let today, tomorrow, dayAfterTomorrow;
  for (const forecast of jsonData.forecasts) {
    const average = calculateChanceOfRain(forecast.chanceOfRain);
    const newForecast = {
      ...forecast,
      condition: telopToForecastWeatherCondition(forecast.telop),
      chanceOfRain: {
        ...forecast.chanceOfRain,
        average,
      },
    };
    switch (forecast.dateLabel) {
      case '今日':
        today = newForecast;
        break;
      case '明日':
        tomorrow = newForecast;
        break;
      case '明後日':
        dayAfterTomorrow = newForecast;
        break;
      default:
        break;
    }
  }

  const weatherData: Weather = {
    publicTime: jsonData.publicTime,
    publicTimeFormatted: jsonData.publicTimeFormatted,
    publishingOffice: jsonData.publishingOffice,
    title: jsonData.title,
    description: jsonData.description,
    forecasts: {
      today,
      tomorrow,
      dayAfterTomorrow,
    },
    location: jsonData.location,
  };

  const currentDate = new Date().toDateString();
  const storedData = {
    date: currentDate,
    weather: weatherData,
  };
  localStorage.setItem(`weather_${id}`, JSON.stringify(storedData));

  return weatherData;
};
