import "./App.css";
import Weather from "./components/weather.Component";
import "bootstrap/dist/css/bootstrap.min.css";
import "weather-icons/css/weather-icons.css";
import React, { Component } from "react";
import Form from "./components/Form.component";
import Footer from "./components/Footer";
//api callapi.openweathermap.org/data/2.5/weather?q=London,uk

const Api_key = "1c235cd3cecc2a85d92e71f37c7012f3 ";

class App extends Component {
  constructor() {
    super();
    this.state = {
      city: undefined,
      country: undefined,
      temp_min: undefined,
      icon: undefined,
      temp_max: undefined,
      main: undefined,
      celsius: undefined,
      description: "",
      error: false,
    };

    this.weathericon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-sunny ",
    };
  }

  get_WeatherIcon(icon, rangeId) {
    switch (true) {
      case rangeId >= 200 && rangeId <= 232:
        this.setState({ icon: this.weathericon.Thunderstorm });
        break;

      case rangeId >= 300 && rangeId <= 321:
        this.setState({ icon: this.weathericon.Drizzle });
        break;
      case rangeId >= 500 && rangeId <= 531:
        this.setState({ icon: this.weathericon.Rain });
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({ icon: this.weathericon.Snow });
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({ icon: this.weathericon.Atmosphere });
        break;
      case rangeId == 800:
        this.setState({ icon: this.weathericon.Clear });
        break;
      case rangeId == 801 && rangeId <= 804:
        this.setState({ icon: this.weathericon.Clouds });
        break;
      default:
        this.setState({ icon: this.weathericon.Clouds });
    }
  }
  getWeather = async (e) => {
    e.preventDefault();

    const city = e.target.elements.City.value;
    const country = e.target.elements.Country.value;

    if (city && country) {
      const api_call = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${Api_key}`
      );
      const response = await api_call.json();
      this.setState({
        city: `${response.name},${response.sys.country}`,
        celsius: this.calculateCelsius(response.main.temp),
        temp_max: this.calculateCelsius(response.main.temp_max),
        temp_min: this.calculateCelsius(response.main.temp_min),
        description: response.weather[0].description,
        icon: this.weathericon.Clouds,
      });
      this.get_WeatherIcon(this.weathericon, response.weather[0].id);
    } else {
      this.setState({ error: true });
    }
  };

  calculateCelsius(temp) {
    let cell = Math.floor(temp - 273.15);
    return cell;
  }

  render() {
    return (
      <div className="App">
        <Form loadweather={this.getWeather} error={this.state.error} />
        <Weather
          city={this.state.city}
          country={this.state.country}
          temp_celsius={this.state.celsius}
          temp_max={this.state.temp_max}
          temp_min={this.state.temp_min}
          description={this.state.description}
          weatherIcon={this.state.icon}
        />
        <Footer />
      </div>
    );
  }
}

export default App;
