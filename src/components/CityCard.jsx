import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
} from 'react-native';

import Colors from '../constants/Colors';

const CityCard = ({city, onPress}) => {

  return(

    <Pressable
      style={styles.card}
      onPress={onPress}>

      <Text style={styles.city}>
        📍 {city}
      </Text>

    </Pressable>

  );

};

export default CityCard;

const styles = StyleSheet.create({

  card: {
  backgroundColor: Colors.white,

  marginHorizontal: 8,
  marginVertical: 8,

  paddingVertical: 18,
  paddingHorizontal: 20,

  borderRadius: 22,

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

  city:{
    fontSize:18,
    fontWeight:'600',
    color:Colors.black,
  },

});