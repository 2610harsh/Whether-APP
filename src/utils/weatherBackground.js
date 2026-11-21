const getWeatherBackground = weatherMain => {
  switch (weatherMain) {
    case 'Clear':
      return '#4FACFE'; // Sunny

    case 'Clouds':
      return '#B8C6DB'; // Cloudy

    case 'Rain':
      return '#5D6D7E'; // Rain

    case 'Drizzle':
      return '#7F8C8D';

    case 'Thunderstorm':
      return '#2C3E50';

    case 'Snow':
      return '#ECF0F1';

    case 'Mist':
    case 'Fog':
    case 'Haze':
      return '#BDC3C7';

    default:
      return '#87CEEB';
  }
};

export default getWeatherBackground;