import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import Colors from '../constants/Colors';
import SearchBar from '../components/SearchBar';
import CountryCard from '../components/CountryCard';
import {
  getCountries,
  getWeatherByLocation,
} from '../api/weatherApi';
import { requestLocation } from '../utils/location';

const CountryScreen = ({ navigation }) => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [locationLoading, setLocationLoading] = useState(false);

  useEffect(() => {
    loadCountries();
  }, []);

  const loadCountries = async () => {
    try {
      console.log('========== START ==========');

      const data = await getCountries();

      console.log('Returned Data:', data);

      console.log('Is Array:', Array.isArray(data));

      console.log('Length:', data.length);

      if (Array.isArray(data)) {
        setCountries(data);
      }

      console.log('========== END ==========');
    } catch (error) {
      console.log('ERROR:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCountries = countries.filter(country =>
    country.name
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  const getCurrentLocation = async () => {
  try {
    setLocationLoading(true);

    const coords = await requestLocation();

    if (!coords) {
      setLocationLoading(false);
      return;
    }

    const weather = await getWeatherByLocation(
      coords.latitude,
      coords.longitude,
    );

    navigation.navigate('Weather', {
      city: weather.name,
      country: weather.sys.country,
      iso2: weather.sys.country.toLowerCase(),
    });

  } catch (error) {
    console.log(error);
  } finally {
    setLocationLoading(false);
  }
};


  if (loading) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <ActivityIndicator
          size="large"
          color={Colors.primary}
        />
        <Text style={styles.loadingText}>
          Loading Countries...
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginTop: 10, marginBottom: 10 }}>
        <Text style={styles.title}>🌤 Weather App</Text>
      </View>

      <View style={{ marginHorizontal: 8 }}>
        <SearchBar
          placeholder="Search Country"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <TouchableOpacity
  style={styles.locationButton}
  disabled={locationLoading}
  onPress={getCurrentLocation}>

  <Text style={styles.locationText}>
    {locationLoading
      ? 'Getting Your Location...'
      : '📍 Use Current Location'}
  </Text>

</TouchableOpacity>

      {filteredCountries.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            No countries found.
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredCountries}
          keyExtractor={item => item.iso2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 8,

            paddingBottom: 40,
          }}
          renderItem={({ item }) => (
            <CountryCard
              item={item}
              onPress={() =>
                navigation.navigate('City', {
                  country: item,
                })
              }
            />
          )}
        />
      )}
      {locationLoading && (
  <View style={styles.loadingOverlay}>
    <View style={styles.loadingCard}>

      <ActivityIndicator
        size="large"
        color="#4FACFE"
      />

      <Text style={styles.loadingEmoji}>
        📍
      </Text>

      <Text style={styles.loadingTitle}>
        Detecting Your Location
      </Text>

      <Text style={styles.loadingSubTitle}>
        Please wait while we find your location and fetch the latest weather information.
      </Text>

    </View>
  </View>
)}
    </SafeAreaView>
  );
};

export default CountryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 22,
    paddingTop: 18,
  },

  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },

  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: Colors.gray,
  },

  title: {
    fontSize: 40,
    fontWeight: '800',
    color: '#111827',
    letterSpacing: -1,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyText: {
    fontSize: 18,
    color: Colors.gray,
  },
  locationButton: {
    backgroundColor: '#4F9CF9',
    height: 58,
    borderRadius: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    marginHorizontal: 8,
    marginBottom: 20,

    shadowColor: '#4F9CF9',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,

    elevation: 6,
  },

  locationText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 8,
  },
  loadingOverlay: {
  ...StyleSheet.absoluteFillObject,
  backgroundColor: 'rgba(0,0,0,0.45)',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 999,
},

loadingCard: {
  width: '85%',
  backgroundColor: '#FFFFFF',
  borderRadius: 25,
  paddingVertical: 35,
  paddingHorizontal: 25,
  alignItems: 'center',

  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 8,
  },
  shadowOpacity: 0.2,
  shadowRadius: 15,

  elevation: 12,
},

loadingEmoji: {
  fontSize: 45,
  marginTop: 18,
},

loadingTitle: {
  fontSize: 22,
  fontWeight: '700',
  color: '#111827',
  marginTop: 15,
  textAlign: 'center',
},

loadingSubTitle: {
  fontSize: 15,
  color: '#6B7280',
  textAlign: 'center',
  marginTop: 12,
  lineHeight: 22,
},
});