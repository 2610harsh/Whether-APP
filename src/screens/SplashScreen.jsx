import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Country');
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.icon}>🌤️</Text>

        <Text style={styles.title}>
          Weather App
        </Text>

        <Text style={styles.subtitle}>
          Live Weather Information
        </Text>

        <ActivityIndicator
          size="large"
          color="#007AFF"
          style={{marginTop:30}}
        />
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({

container:{
flex:1,
justifyContent:'center',
alignItems:'center',
backgroundColor:'#F5F8FF'
},

logoContainer:{
alignItems:'center'
},

icon:{
fontSize:90
},

title:{
fontSize:34,
fontWeight:'bold',
marginTop:15
},

subtitle:{
fontSize:18,
marginTop:8,
color:'gray'
}

});