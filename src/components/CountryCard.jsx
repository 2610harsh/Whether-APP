import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Colors from '../constants/Colors';

const CountryCard = ({ item, onPress }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        pressed && styles.pressed,
      ]}
      onPress={onPress}>

      <Image
        source={{
          uri: `https://flagcdn.com/w80/${item.iso2.toLowerCase()}.png`,
        }}
        style={styles.flag}
        resizeMode="cover"
      />

      <View style={styles.textContainer}>
        <Text style={styles.name}>
          {item.name}
        </Text>

        <Text style={styles.arrow}>
          ›
        </Text>
      </View>

    </Pressable>
  );
};

export default CountryCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    marginHorizontal: 8,
    marginVertical: 8,
    paddingVertical: 15,
    paddingHorizontal: 18,
    borderRadius: 18,

    flexDirection: 'row',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,

    elevation: 4,
  },

  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },

  flag: {
    width: 55,
    height: 40,
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: '#E5E7EB',
    backgroundColor: '#F3F4F6',
  },

  textContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 18,
  },

  name: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.black,
  },

  arrow: {
    fontSize: 28,
    color: '#9CA3AF',
  },
});