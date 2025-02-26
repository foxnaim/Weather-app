"use client";

import { useState } from "react";
import axios from "axios";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<null | any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city.trim()) return;
    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const API_KEY = "YOUR_API_KEY";
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}&lang=ru`
      );
      setWeather(response.data);
    } catch (err) {
      setError("Город не найден");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold text-center mb-4">Погода</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Введите город..."
          className="flex-1 p-2 border rounded-lg"
        />
        <button
          onClick={fetchWeather}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Узнать погоду
        </button>
      </div>

      {loading && <p className="text-center">Загрузка...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {weather && (
        <div className="text-center">
          <h3 className="text-lg font-semibold">{weather.name}, {weather.sys.country}</h3>
          <p className="text-xl font-bold">{weather.main.temp}°C</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
            alt={weather.weather[0].description}
            className="mx-auto"
          />
          <p>{weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
