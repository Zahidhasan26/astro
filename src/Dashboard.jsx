import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend } from 'recharts';

const API_KEY = 'd26fdf455dc4e1fa95931f916366601d';
const CITIES = ['New York', 'Miami', 'Chicago', 'Los Angeles', 'Dallas'];

export default function Dashboard() {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const results = await Promise.all(
        CITIES.map(async (city) => {
          const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`);
          const data = await res.json();
          return {
            name: city,
            temp: data.main.temp,
            humidity: data.main.humidity,
            feels_like: data.main.feels_like,
            wind: data.wind.speed,
            description: data.weather[0].description
          };
        })
      );
      setWeatherData(results);
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard">
      <h1>Weather Dashboard</h1>

      <h2>Cities</h2>
      <ul>
        {weatherData.map((city, idx) => (
          <li key={idx}>
            <Link to={`/city/${city.name}`}>{city.name} - {city.temp}°C</Link>
          </li>
        ))}
      </ul>

      <h2>Temperature Chart</h2>
      <BarChart width={500} height={300} data={weatherData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="temp" fill="#8884d8" />
      </BarChart>

      <h2>Humidity Distribution</h2>
      <PieChart width={400} height={300}>
        <Pie
          data={weatherData}
          dataKey="humidity"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#82ca9d"
          label
        >
          {weatherData.map((entry, index) => (
            <Cell key={index} fill={["#8884d8", "#83a6ed", "#8dd1e1", "#82ca9d", "#a4de6c"][index % 5]} />
          ))}
        </Pie>
        <Legend />
      </PieChart>
    </div>
  );
}
