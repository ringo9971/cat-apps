import useCitiesMaster from 'hooks/weather/useCitiesMaster';
import { getLocalStorage, setLocalStorage } from 'LocalStorage';
import { useState } from 'react';
import { City } from 'types/weather/City';

interface CitiesOpearionState {
  cities: Array<City>;
  addCity: (cityName: string) => City | undefined;
  removeCity: (cityName: string) => City | undefined;
}

const useCitiesOpeartion = (): CitiesOpearionState => {
  const { citiesMaster } = useCitiesMaster();
  const [cities, setCities] = useState<Array<City>>(() => {
    const cityNames: Array<string> = getLocalStorage('cityNames') ?? [];
    return cityNames
      .map((cityName) => citiesMaster.find((city) => city.name === cityName))
      .filter((city) => city != null);
  });

  const addCity = (cityName: string): City | undefined => {
    console.log(cityName);
    if (cities.find((c) => c.name === cityName)) return;

    const city = citiesMaster.find((c) => c.name === cityName);
    if (city == null) return;

    cities.push(city);
    setCities(cities);
    setLocalStorage(
      'cityNames',
      cities.map((city) => city.name)
    );

    return city;
  };

  const removeCity = (cityName: string): City | undefined => {
    if (cities.find((c) => c.name === cityName)) return;

    const city = citiesMaster.find((c) => c.name === cityName);
    if (city == null) return;

    cities.filter((c) => c !== city);
    setCities(cities);
    setLocalStorage(
      'cityNames',
      cities.map((city) => city.name)
    );

    return city;
  };

  return {
    cities,
    addCity,
    removeCity,
  };
};

export default useCitiesOpeartion;
