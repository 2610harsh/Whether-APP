import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';


const InfoCard = ({icon, title, value}) => {
  return (
    <View style={styles.card}>

    <Text style={styles.icon}>{icon}</Text>

    <Text style={styles.value}>{value}</Text>

    <Text style={styles.title}>{title}</Text>

</View>
  );
};

export default InfoCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,

    marginHorizontal: 6,
    marginVertical: 8,

    borderRadius: 22,

    paddingVertical: 22,
    paddingHorizontal: 16,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: 'rgba(255,255,255,0.16)',

    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',

    overflow: 'hidden',

    elevation: 0,
  },

  icon: {
    fontSize: 34,
    marginBottom: 10,
  },

  value: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
  },

  title: {
    marginTop: 8,
    color: 'rgba(255,255,255,0.85)',
    fontSize: 14,
    fontWeight: '500',
  },
});