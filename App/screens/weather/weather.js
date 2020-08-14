import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {weatherConditions} from './weatherConditions';

const Weather = ({weather, temperature, city}) => {
  return (
    <View
      style={[
        styles.weatherContainer,
        {backgroundColor: weatherConditions[weather].color},
      ]}>
      <View style={styles.headerContainer}>
        <Icon size={72} name={weatherConditions[weather].icon} color={'#fff'} />
        <Text style={styles.tempText}>{temperature}˚C</Text>
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.city}>{city}</Text>
      </View>

      <View style={styles.bodyContainer}>
        <Text style={styles.title}>{weatherConditions[weather].title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  weatherContainer: {
    flex: 1,
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tempText: {
    paddingStart: 20,
    fontSize: 48,
    color: '#fff',
  },
  bodyContainer: {
    flex: 2,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingLeft: 25,
    marginBottom: 40,
  },
  city: {
    paddingTop: 60,
    fontSize: 48,
    color: '#fff',
  },
  title: {
    fontSize: 48,
    color: '#fff',
  },
  subtitle: {
    fontSize: 24,
    color: '#fff',
  },
});

export default Weather;
