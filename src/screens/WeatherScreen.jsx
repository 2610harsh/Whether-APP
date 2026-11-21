import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';

import { getWeather } from '../api/weatherApi';
import InfoCard from '../components/InfoCard';
import LinearGradient from 'react-native-linear-gradient';
import getWeatherGradient from '../utils/weatherGradient';
import ForecastCard from '../components/ForecastCard';
import { getForecast } from '../api/weatherApi';

const WeatherScreen = ({ route }) => {
    const { city, country, iso2 } = route.params;

    const gradient = weather
        ? getWeatherGradient(weather.weather[0].main)
        : ['#4FACFE', '#00F2FE'];

    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [forecast, setForecast] = useState([]);

    useEffect(() => {
        loadWeather();
    }, []);

    const loadWeather = async () => {
        try {
            const data = await getWeather(city);

            console.log('Weather API Response:', data);

            setWeather(data);

            const forecastData = await getForecast(
                data.coord.lat,
                data.coord.lon,
            );

            const week = forecastData.time.map((date, index) => ({
                day: new Date(date).toLocaleDateString('en-US', {
                    weekday: 'short',
                }),
                max: forecastData.temperature_2m_max[index],
                min: forecastData.temperature_2m_min[index],
                code: forecastData.weather_code[index],
            }));

            setForecast(week);
        } catch (error) {
            console.log('Weather Error:', error);

            if (error.response) {
                console.log(error.response.data);
            }
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <LinearGradient
                colors={gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.loader}>

                <Text style={styles.loadingEmoji}>☁️</Text>

                <ActivityIndicator
                    size="large"
                    color="#fff"
                />

                <Text style={styles.loadingText}>
                    Loading Weather...
                </Text>

            </LinearGradient>
        );
    }

    const formatTime = timestamp => {
        return new Date(timestamp * 1000).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <LinearGradient
  colors={gradient}
  start={{x: 0, y: 0}}
  end={{x: 1, y: 1}}
  style={{flex: 1}}>

  <StatusBar
    translucent
    backgroundColor="transparent"
    barStyle="light-content"
  />

  <SafeAreaView
    style={{flex: 1}}
    edges={['top', 'bottom']}>

    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}>

                    {/* Header */}

                    <View style={styles.header}>

                        <Image
                            source={{
                                uri: `https://flagcdn.com/w80/${iso2.toLowerCase()}.png`,
                            }}
                            style={styles.flag}
                        />

                        <View>
                            <Text style={styles.city}>
                                {city}
                            </Text>

                            <Text style={styles.country}>
                                {country}
                            </Text>
                        </View>

                    </View>

                    <Text style={styles.greeting}>
                        {weather.weather[0].main === 'Clear'
                            ? '☀️ Sunny Day'
                            : weather.weather[0].main === 'Clouds'
                                ? '☁️ Cloudy Sky'
                                : weather.weather[0].main === 'Rain'
                                    ? '🌧 Rainy Weather'
                                    : weather.weather[0].main === 'Thunderstorm'
                                        ? '⛈ Stormy Weather'
                                        : '🌤 Live Weather'}
                    </Text>

                    {/* Weather Icon */}

                    <Image
                        source={{
                            uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`,
                        }}
                        style={styles.weatherIcon}
                    />

                    <Text style={styles.temperature}>
                        {Math.round(weather.main.temp)}°C
                    </Text>

                    <Text style={styles.description}>
                        {weather.weather[0].description
                            .split(' ')
                            .map(word =>
                                word.charAt(0).toUpperCase() + word.slice(1),
                            )
                            .join(' ')}
                    </Text>

                    <Text style={styles.updated}>
                        Updated Just Now
                    </Text>

                    <View style={styles.row}>

                        <InfoCard
                            icon="💧"
                            title="Humidity"
                            value={`${weather.main.humidity}%`}
                        />

                        <InfoCard
                            icon="🌬"
                            title="Wind"
                            value={`${weather.wind.speed} m/s`}
                        />

                    </View>

                    <View style={styles.row}>

                        <InfoCard
                            icon="🌡"
                            title="Feels Like"
                            value={`${Math.round(weather.main.feels_like)}°C`}
                        />

                        <InfoCard
                            icon="📈"
                            title="Pressure"
                            value={`${weather.main.pressure} hPa`}
                        />

                    </View>

                    <View style={styles.row}>

                        <InfoCard
                            icon="👁"
                            title="Visibility"
                            value={`${weather.visibility / 1000} km`}
                        />

                        <InfoCard
                            icon="☁️"
                            title="Clouds"
                            value={`${weather.clouds.all}%`}
                        />

                    </View>

                    <View style={styles.row}>

                        <InfoCard
                            icon="🌅"
                            title="Sunrise"
                            value={formatTime(weather.sys.sunrise)}
                        />

                        <InfoCard
                            icon="🌇"
                            title="Sunset"
                            value={formatTime(weather.sys.sunset)}
                        />

                    </View>


                    <Text style={styles.forecastTitle}>
                        7-Day Forecast
                    </Text>

                    <FlatList
    horizontal
    data={forecast}
    keyExtractor={(item, index) => index.toString()}
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={{
        paddingRight: 20,
        paddingBottom: 30,
    }}
    renderItem={({ item }) => (
        <ForecastCard day={item} />
    )}
/>

             </ScrollView>

  </SafeAreaView>

</LinearGradient>
    );
};

export default WeatherScreen;

const styles = StyleSheet.create({

    container: {
    flex: 1,
},

    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },

    flag: {
        width: 60,
        height: 40,
        borderRadius: 5,
        marginRight: 15,
    },

    city: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff',
    },

    country: {
        fontSize: 18,
        color: 'rgba(255,255,255,0.8)',
    },

    weatherIcon: {
        width: 210,
        height: 210,
        alignSelf: 'center',
    },

    temperature: {
        fontSize: 72,
        fontWeight: '300',
        textAlign: 'center',
        color: '#fff',
    },

    description: {
        fontSize: 24,
        textAlign: 'center',
        color: 'rgba(255,255,255,0.9)',
        fontWeight: '600',
    },
    row: {
        flexDirection: 'row',
        marginTop: 10,
    },
    updated: {
        textAlign: 'center',
        color: 'rgba(255,255,255,0.75)',
        marginTop: 8,
        marginBottom: 25,
    },
    greeting: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 22,
        fontWeight: '600',
        marginBottom: 10,
    },
    loadingText: {
        color: '#fff',
        marginTop: 20,
        fontSize: 20,
        fontWeight: '600',
    },
    loadingEmoji: {
        fontSize: 80,
        marginBottom: 20,
    },
    scrollContainer: {
        flexGrow: 1,
        padding: 20,
        paddingBottom: 40,
    },
    forecastTitle: {
        fontSize: 24,
        color: '#fff',
        fontWeight: '700',
        marginTop: 30,
        marginBottom: 15,
    },
});