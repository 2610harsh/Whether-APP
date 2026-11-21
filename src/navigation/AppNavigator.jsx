import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screens/SplashScreen';
import CountryScreen from '../screens/CountryScreen';
import CityScreen from '../screens/CityScreen';
import WeatherScreen from '../screens/WeatherScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {

    return (

        <NavigationContainer>

            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >

                <Stack.Screen
                    name="Splash"
                    component={SplashScreen}
                />

                <Stack.Screen
                    name="Country"
                    component={CountryScreen}
                />

                <Stack.Screen
                    name="City"
                    component={CityScreen}
                    options={{
                        title: 'Cities',
                    }}
                />

                <Stack.Screen
                    name="Weather"
                    component={WeatherScreen}
                />

            </Stack.Navigator>

        </NavigationContainer>

    )

}

export default AppNavigator;