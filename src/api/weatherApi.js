import api from './api';

const WEATHER_API_KEY = 'KEY';

export const getCountries = async () => {
  const response = await fetch(
    'https://countriesnow.space/api/v0.1/countries/positions',
  );

  const json = await response.json();

  return json.data.sort((a, b) =>
    a.name.localeCompare(b.name),
  );
};

export const getCities = async country => {
  const response = await api.post(
    'https://countriesnow.space/api/v0.1/countries/cities',
    {
      country,
    },
  );

  return response.data.data;
};

export const getWeather = async city => {
  const response = await api.get(
    'https://api.openweathermap.org/data/2.5/weather',
    {
      params: {
        q: city,
        appid: WEATHER_API_KEY,
        units: 'metric',
      },
    },
  );

  return response.data;
};

// --------------------
// 7-Day Forecast (Open-Meteo)
// --------------------

export const getForecast = async (lat, lon) => {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`
  );

  const data = await response.json();

  return data.daily;
};

export const getWeatherByLocation = async (lat, lon) => {
  const response = await api.get(
    'https://api.openweathermap.org/data/2.5/weather',
    {
      params: {
        lat,
        lon,
        appid: WEATHER_API_KEY,
        units: 'metric',
      },
    },
  );

  return response.data;
};
