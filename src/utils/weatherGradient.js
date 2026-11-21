const getWeatherGradient = weatherMain => {
  switch (weatherMain) {
    case 'Clear':
      return ['#4FACFE', '#00F2FE'];

    case 'Clouds':
      return ['#BDC3C7', '#2C3E50'];

    case 'Rain':
      return ['#4B79A1', '#283E51'];

    case 'Drizzle':
      return ['#89F7FE', '#66A6FF'];

    case 'Thunderstorm':
      return ['#232526', '#414345'];

    case 'Snow':
      return ['#E6DADA', '#274046'];

    case 'Mist':
    case 'Fog':
    case 'Haze':
      return ['#757F9A', '#D7DDE8'];

    default:
      return ['#4FACFE', '#00F2FE'];
  }
};

export default getWeatherGradient;