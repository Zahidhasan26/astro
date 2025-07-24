import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const API_KEY = 'd26fdf455dc4e1fa95931f916366601d';

export default function DetailView() {
  const { cityName } = useParams();
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchCity = async () => {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`);
      const data = await res.json();
      setDetails(data);
    };

    fetchCity();
  }, [cityName]);

  if (!details) return <div>Loading...</div>;

  return (
    <div className="detail-view">
      <h1>{cityName}</h1>
      <p><strong>Temperature:</strong> {details.main.temp}°C</p>
      <p><strong>Feels Like:</strong> {details.main.feels_like}°C</p>
      <p><strong>Humidity:</strong> {details.main.humidity}%</p>
      <p><strong>Pressure:</strong> {details.main.pressure} hPa</p>
      <p><strong>Wind Speed:</strong> {details.wind.speed} m/s</p>
      <p><strong>Description:</strong> {details.weather[0].description}</p>
    </div>
  );
}
