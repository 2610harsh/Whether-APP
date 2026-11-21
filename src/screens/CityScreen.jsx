import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
} from 'react-native';

import SearchBar from '../components/SearchBar';
import CityCard from '../components/CityCard';
import Colors from '../constants/Colors';
import { getCities } from '../api/weatherApi';

const CityScreen = ({ route, navigation }) => {
  const { country } = route.params;

  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCities();
  }, []);

  const loadCities = async () => {
    try {
      const data = await getCities(country.name);

      setCities(data);
      setFilteredCities(data);
    } catch (error) {
      console.log('Error Loading Cities:', error);
    } finally {
      setLoading(false);
    }
  };

  const searchCity = text => {
    setSearch(text);

    if (text.trim() === '') {
      setFilteredCities(cities);
      return;
    }

    const result = cities.filter(city =>
      city.toLowerCase().includes(text.toLowerCase()),
    );

    setFilteredCities(result);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loader}>
        <ActivityIndicator
          size="large"
          color={Colors.primary}
        />
        <Text style={styles.loadingText}>
          Loading Cities...
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>

      {/* Header */}

      <View style={styles.header}>

        <Image
          source={{
            uri: `https://flagcdn.com/w80/${country.iso2.toLowerCase()}.png`,
          }}
          style={styles.flag}
        />

        <Text style={styles.title}>
          {country.name}
        </Text>

      </View>

      <View style={styles.searchContainer}>
        <SearchBar
          placeholder="Search City"
          value={search}
          onChangeText={searchCity}
        />
      </View>

      <FlatList
        data={filteredCities}
        keyExtractor={item => item}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>
            No City Found
          </Text>
        )}
        renderItem={({ item }) => (
          <CityCard
            city={item}
            onPress={() =>
              navigation.navigate('Weather', {
                city: item,
                country: country.name,
                iso2: country.iso2,
              })
            }
          />
        )}
      />

    </SafeAreaView>
  );
};

export default CityScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  loader: {
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

  header: {
  flexDirection: 'row',
  alignItems: 'center',

  paddingHorizontal: 24,

  paddingTop:
    Platform.OS === 'android'
      ? StatusBar.currentHeight + 20
      : 18,

  paddingBottom: 20,
},

  flag: {
    width: 55,
    height: 40,
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: '#E5E7EB',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.black,
    marginLeft: 15,
  },

  emptyText: {
    marginTop: 50,
    textAlign: 'center',
    fontSize: 18,
    color: Colors.gray,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 18,
  },
  listContent: {
    paddingHorizontal: 12,
    paddingBottom: 30,
  },
});