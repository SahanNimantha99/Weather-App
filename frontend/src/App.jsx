import React, { useEffect, useState } from "react";
import WeatherCard from "./WeatherCard";
import { fetchWeather } from "./api";

const App = () => {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchWeather();
      if (Array.isArray(data)) {
        setWeatherData(data);
      } else {
        console.error("Weather data is not an array:", data);
        setWeatherData([]);
      }
    };
    getData();
  }, []);

  return (
    <div className="app">
      <h1>Weather App</h1>
      <div className="weather-grid">
        {weatherData.length > 0 ? (
          weatherData.map((city) => (
            <WeatherCard
              key={city.CityCode}
              cityName={city.CityName}
              temp={city.Temp}
              status={city.Status}
            />
          ))
        ) : (
          <p>Loading weather data or no data available...</p>
        )}
      </div>
    </div>
  );
};

export default App;
