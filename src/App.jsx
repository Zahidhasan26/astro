import React, { useEffect, useState } from "react";
import "./app.css";

const API_KEY = "def4b21c05244c5f89990e9a717fa98e";
const CITY_LIST = ["London", "New York", "Tokyo", "Dhaka", "Paris", "Berlin", "Sydney", "Moscow", "Toronto", "Delhi"];

function App() {
  const [weatherData, setWeatherData] = useState([]);
  const [search, setSearch] = useState("");
  const [conditionFilter, setConditionFilter] = useState("All");
  const [minTemp, setMinTemp] = useState("");
  const [maxTemp, setMaxTemp] = useState("");

  useEffect(() => {
    const fetchWeather = async () => {
      const results = await Promise.all(
        CITY_LIST.map(async (city) => {
          try {
            const res = await fetch(
              `https://api.weatherbit.io/v2.0/current?city=${city}&key=${API_KEY}`
            );
            const json = await res.json();
            return json.data[0];
          } catch (error) {
            console.error("Error fetching city:", city, error);
            return null;
          }
        })
      );
      setWeatherData(results.filter(Boolean));
    };

    fetchWeather();
  }, []);

  // Filters
  const filtered = weatherData
    .filter((w) =>
      w.city_name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((w) =>
      conditionFilter === "All" ? true : w.weather.description === conditionFilter
    )
    .filter((w) =>
      (minTemp === "" || w.temp >= parseFloat(minTemp)) &&
      (maxTemp === "" || w.temp <= parseFloat(maxTemp))
    );

  // Summary Stats
  const avgTemp =
    weatherData.length > 0
      ? (
          weatherData.reduce((sum, w) => sum + w.temp, 0) /
          weatherData.length
        ).toFixed(1)
      : "N/A";

  const hotCities =
    weatherData.length > 0
      ? weatherData.filter((w) => w.temp > 30).length
      : 0;

  const uniqueConditions =
    weatherData.length > 0
      ? [...new Set(weatherData.map((w) => w.weather.description))]
      : [];

  return (
    <div className="container">
      <h1>🌦 Weather Dashboard</h1>

      <div className="stats">
        <div>Total Cities: {weatherData.length}</div>
        <div>Avg Temp: {avgTemp}°C</div>
        <div>Hot Cities (&gt;30°C): {hotCities}</div>
      </div>

      <div className="controls">
        <input
          type="text"
          placeholder="Search city..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={conditionFilter}
          onChange={(e) => setConditionFilter(e.target.value)}
        >
          <option value="All">All Conditions</option>
          {uniqueConditions.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Min Temp (°C)"
          value={minTemp}
          onChange={(e) => setMinTemp(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max Temp (°C)"
          value={maxTemp}
          onChange={(e) => setMaxTemp(e.target.value)}
        />
      </div>

      {weatherData.length === 0 ? (
        <p>Loading weather data...</p>
      ) : (
        <div className="list">
          {filtered.map((w) => (
            <div className="card" key={w.city_name}>
              <img
                src={`https://www.weatherbit.io/static/img/icons/${w.weather.icon}.png`}
                alt="icon"
              />
              <div>
                <h3>{w.city_name}</h3>
                <p>{w.weather.description}</p>
                <p>Temp: {w.temp}°C</p>
                <p>Humidity: {w.rh}%</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
