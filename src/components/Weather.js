import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { weatherConditions } from '../assest/constants/WeatherConditions';

const Weather = ({ weather, temperature, location }) => {
  return (
    <View style={
        [styles.weatherContainer,
        { backgroundColor: weatherConditions[weather].color }]}>
      <View style={styles.headerContainer}>
        <Text style={styles.locationText}>{location.name}, {location.country}</Text>
        <Text style={styles.tempText}>{temperature}˚</Text>
      </View>
      <View style={styles.bodyContainer}>
        <Text style={styles.title}>{weather}</Text>
        <Text style={styles.subtitle}>{weatherConditions[weather].subtitle}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  weatherContainer: {
    backgroundColor: '#f7b733'
  },
  headerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  locationText: {
    fontSize: 14,
    color: '#fff'
  },
  tempText: {
    fontSize: 48,
    color: '#fff'
  },
  bodyContainer: {
    flex: 2,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingLeft: 25,
    marginBottom: 40
  },
  title: {
    fontSize: 48,
    color: '#fff'
  },
  subtitle: {
    fontSize: 24,
    color: '#fff'
  }
});

export default Weather;