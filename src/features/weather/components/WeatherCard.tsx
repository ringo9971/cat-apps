import ReplyIcon from '@mui/icons-material/Reply';
import { Typography, Card, Grid, CardContent } from '@mui/material';
import {
  Weather,
  WeatherForecast,
  WeatherCondition,
  WeatherForecastCondition,
} from 'types/weather/Weather';

export type WeatherOneDayCardProps = {
  forecast: WeatherForecast;
};

const imagePaths: Record<WeatherCondition, string> = {
  sunny: '/weather/sunny.png',
  cloudy: '/weather/cloudy.png',
  rainy: '/weather/rainy.png',
};

const WeatherOneDayCard = ({
  forecast,
}: WeatherOneDayCardProps): JSX.Element => {
  const getWeatherImage = (weather?: WeatherForecastCondition) => {
    const style: React.CSSProperties = {
      maxWidth: '60%',
      height: 'auto',
      position: 'absolute',
      bottom: 0,
      right: 0,
    };

    return (
      <div style={{ position: 'relative' }}>
        <img
          src={
            weather?.main
              ? imagePaths[weather.main as WeatherCondition]
              : '/cat_loading.gif'
          }
          style={{ maxWidth: '100%', height: 'auto' }}
        />
        {weather?.sometimes && (
          <img
            src={imagePaths[weather.sometimes as WeatherCondition]}
            style={style}
          />
        )}
        {weather?.later && (
          <>
            <img
              src={imagePaths[weather.later as WeatherCondition]}
              style={style}
            />
            <ReplyIcon
              sx={{
                width: '30%',
                height: 'auto',
                position: 'absolute',
                bottom: '10%',
                right: '45%',
                transform: 'scaleX(-1) scaleY(-1)',
              }}
            />
          </>
        )}
      </div>
    );
  };

  return (
    <>
      <Typography variant="h4" style={{ textAlign: 'center' }}>
        {forecast.dateLabel}
      </Typography>
      {getWeatherImage(forecast.condition)}
      <Typography variant="h4" style={{ textAlign: 'center' }}>
        <span style={{ fontSize: 'smaller' }}>気温: </span>
        <span style={{ color: 'red' }}>
          {forecast.temperature?.max.celsius ?? '?'}
        </span>
        <span style={{ fontSize: 'smaller' }}> ℃</span>/
        <span style={{ color: 'blue' }}>
          {forecast.temperature?.min.celsius ?? '?'}
        </span>
        <span style={{ fontSize: 'smaller' }}> ℃</span>
      </Typography>
      <Typography variant="h4" style={{ textAlign: 'center' }}>
        <span style={{ fontSize: 'smaller' }}>降水確率: </span>
        {forecast.chanceOfRain?.average ?? '?'}
        <span style={{ fontSize: 'smaller' }}> %</span>
      </Typography>
    </>
  );
};

export type WeatherCardProps = {
  weather: Weather;
};

const WeatherCard = ({ weather }: WeatherCardProps): JSX.Element => {
  return (
    <Card>
      <CardContent>
        <Grid container alignItems="center">
          <Grid item>
            <Typography variant="h2">{weather.location.city}</Typography>
          </Grid>
        </Grid>

        <Grid container style={{ display: 'flex' }}>
          {[
            { label: '今日', forecast: weather.forecasts.today },
            { label: '明日', forecast: weather.forecasts.tomorrow },
            { label: '明後日', forecast: weather.forecasts.dayAfterTomorrow },
          ].map(({ label, forecast }) => {
            return (
              <Grid
                item
                key={label}
                xs={4}
                style={{ display: 'flex', flexDirection: 'column' }}
              >
                <WeatherOneDayCard forecast={forecast} />
              </Grid>
            );
          })}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
