import { useEffect, useState } from "react";
import WeatherChart from "./components/WeatherChart";

const cities = ["New York", "Miami", "Chicago", "Los Angeles", "Dallas"];
const API_KEY = "d26fdf455dc4e1fa95931f916366601d";

function App() {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const allData = [];

        for (const city of cities) {
          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
              city
            )}&appid=${API_KEY}&units=metric`
          );
          const json = await res.json();

          if (json.main) {
            allData.push({
              name: json.name,
              temp: json.main.temp,
            });
          } else {
            console.warn(`No data for city: ${city}`, json);
          }
        }

        setWeatherData(allData);
      } catch (err) {
        console.error("API error:", err);
      }
    };

    fetchWeather();
  }, []);

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
      <h1>City Temperatures (OpenWeatherMap)</h1>
      {weatherData.length > 0 ? (
        <WeatherChart data={weatherData} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
