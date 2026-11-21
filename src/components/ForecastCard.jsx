import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const weatherEmoji = code => {
  if (code === 0) return '☀️';
  if ([1, 2, 3].includes(code)) return '⛅';
  if ([45, 48].includes(code)) return '🌫';
  if ([51, 53, 55, 61, 63, 65].includes(code)) return '🌧';
  if ([71, 73, 75].includes(code)) return '❄️';
  if ([95, 96, 99].includes(code)) return '⛈';

  return '🌤';
};

const ForecastCard = ({day}) => {
  return (
    <View style={styles.card}>

      <Text style={styles.day}>
        {day.day}
      </Text>

      <Text style={styles.icon}>
        {weatherEmoji(day.code)}
      </Text>

      <Text style={styles.max}>
        {Math.round(day.max)}°
      </Text>

      <Text style={styles.min}>
        {Math.round(day.min)}°
      </Text>

    </View>
  );
};

export default ForecastCard;

const styles = StyleSheet.create({
  card: {
    width: 95,
    padding: 15,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
  },

  day: {
    color: '#fff',
    fontWeight: '700',
    marginBottom: 8,
  },

  icon: {
    fontSize: 35,
  },

  max: {
    marginTop: 8,
    color: '#fff',
    fontWeight: '700',
    fontSize: 22,
  },

  min: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 16,
  },
});