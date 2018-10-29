import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TextInput,Dimensions  } from 'react-native';
import HelloWorldText from './src/components/common/HelloWorldText';
import Weather from './src/components/Weather';
import { API_KEY } from './src/api/WeatherAPIKey';
import { weatherConditions } from './src/assest/constants/WeatherConditions';


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      isLoading: true,
      temperature: 0,
      weatherCondition: null,
      error: null,
      location: null,
      position: null
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
          this.setState({
        location: position
      });
      this.fetchWeather(position.coords.latitude, position.coords.longitude);
    })
  }


  fetchWeather(lat, lon) {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`
    )
      .then(res => res.json())
      .then(json => {
        this.setState({
          temperature: json.main.temp,
          weatherCondition: json.weather[0].main,
          position : { 
            country : json.sys.country,
            name : json.name
          },
          isLoading: false
        })
      });
  }

  render() {
    const isLoading = this.state.isLoading;
    return (
      <View style={[styles.container, {backgroundColor: getbg(this.state.weatherCondition, weatherConditions)}]}>
        {isLoading ?
          (<View><Text>Fetching The Weather</Text></View>) :
          (<View>
            <Weather weather={this.state.weatherCondition} temperature={this.state.temperature} location={this.state.position}/>
          </View>)}
      </View>
    );
  }

 
}

const getbg = (weather, weatherConditions)=> {
    return weather ? weatherConditions[weather].color : '#f7b222';
}

const dimensions = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});
