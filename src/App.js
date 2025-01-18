import React, { useState, useCallback } from "react";
import { Oval } from "react-loader-spinner";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFrown, faSearch } from "@fortawesome/free-solid-svg-icons";
import API_CONFIG from "./configs/API_CONFIG";
import WeatherDisplay from "./components/WeatherDisplay";
import "./App.css";

export default function App() {
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState({
    loading: false,
    data: null,
    error: false,
  });

  // Debounced search function using useCallback
  const searchWeather = useCallback(
    async (event) => {
      if (event.key === "Enter" || event.type === "click") {
        event.preventDefault();
        setInput("");
        setWeather((prev) => ({ ...prev, loading: true, error: false }));

        try {
          const response = await axios.get(API_CONFIG.baseURL, {
            params: {
              ...API_CONFIG.params,
              q: input,
            },
          });

          setWeather({
            data: response.data,
            loading: false,
            error: false,
          });
        } catch (error) {
          setWeather({
            data: null,
            loading: false,
            error: true,
          });
          setInput("");
        }
      }
    },
    [input]
  );

  return (
    <div className="weather-app">
      <h1 className="app-name">Brick Tamland Weather</h1>
      <div className="search-container">
        <input
          type="text"
          className="city-search"
          placeholder="Enter City Name"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={searchWeather}
          aria-label="Search for a city"
        />
        <button className="search-button" onClick={searchWeather} aria-label="Search">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>

      <div className="weather-display">
        {weather.loading && (
          <div className="loader">
            <Oval color="var(--primary-color)" height={60} width={60} />
          </div>
        )}

        {weather.error && (
          <div className="error-message">
            <FontAwesomeIcon icon={faFrown} />
            <span>City not found</span>
          </div>
        )}

        {weather.data && <WeatherDisplay data={weather.data} />}
      </div>
    </div>
  );
}
