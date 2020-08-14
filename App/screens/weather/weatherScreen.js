import React from 'react';
import {StyleSheet, View, ActivityIndicator, Alert} from 'react-native';
import {Appbar, TextInput} from 'react-native-paper';
import Weather from './weather';
import {API_KEY} from './weatherAPIKey';
import {weatherConditions} from './weatherConditions';

export default class WeatherScreen extends React.Component {
  state = {
    isLoading: true,
    temperature: 0,
    weatherCondition: null,
    city: 'Atlanta',
    text: 'Atlanta',
    error: false,
  };

  componentDidMount() {
    this.fetchWeather();
  }

  fetchWeather(city = this.state.text) {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`,
    )
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        if (json.cod === '404') {
          this.setState({error: true});
        } else {
          this.setState({
            temperature: json.main.temp,
            weatherCondition: json.weather[0].main,
            isLoading: false,
            error: false,
            city: json.name,
          });
        }
      });
    console.log(this.state.city);
  }

  createAlert = () => {
    Alert.alert(
      'Invalid City',
      'Check the spelling!', // <- this part is optional, you can pass an empty string
      [{text: 'OK', onPress: () => this.fetchWeather(this.state.city)}],
      {cancelable: false},
    );
  };

  render() {
    const {isLoading} = this.state;
    return (
      <View style={styles.appBar}>
        {this.state.isLoading ? (
          <View style={{flex: 1}}>
            <Appbar.Header>
              <Appbar.Action
                icon="menu"
                onPress={() => this.props.navigation.toggleDrawer()}
              />
              <Appbar.Content title="Weather" />
            </Appbar.Header>
            <View style={styles.spinner}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          </View>
        ) : (
          <View style={styles.appBar}>
            <Appbar.Header
              style={{
                backgroundColor:
                  weatherConditions[this.state.weatherCondition].color,
              }}>
              <Appbar.Action
                icon="menu"
                onPress={() => this.props.navigation.toggleDrawer()}
              />
              <Appbar.Content title="Weather" />
            </Appbar.Header>
            <TextInput
              label="Enter a City"
              mode="outlined"
              onChangeText={(text) => this.setState({text})}
              onBlur={() => {
                this.fetchWeather(this.state.text);
              }}
            />
            {this.state.error === false ? (
              <Weather
                weather={this.state.weatherCondition}
                temperature={this.state.temperature}
                city={this.state.city}
              />
            ) : (
              <View
                style={{
                  backgroundColor:
                    weatherConditions[this.state.weatherCondition].color,
                }}
                onLayout={() => {
                  {
                    this.createAlert();
                  }
                  this.fetchWeather(this.state.city);
                }}></View>
            )}
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  appBar: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
  },
});
