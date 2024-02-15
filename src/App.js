import React, { useState } from "react";
import { Oval } from "react-loader-spinner";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFrown } from "@fortawesome/free-solid-svg-icons";
import "./App.css";

export default function App() {
  //setting up state variables
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState({
    loading: false,
    data: {},
    error: false,
  });

  //function to obtain current date, e.g. format Monday 01 January
  const getDate = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const currentDate = new Date();
    const month = months[currentDate.getMonth()];
    const date = `${days[currentDate.getDay()]} ${currentDate.getDate()} ${month}`;

    return date;
  };

  //obtain data from API
  const search = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setInput("");
      setWeather({ ...weather, loading: true });
      const url = "https://api.openweathermap.org/data/2.5/weather";
      const apiKey = process.env.REACT_APP_API_KEY;
      await axios
        .get(url, {
          params: {
            q: input,
            units: "metric",
            appid: apiKey,
          },
        })
        .then((res) => {
          setWeather({ data: res.data, loading: false, error: false });
        })
        .catch((error) => {
          setWeather({ ...weather, data: {}, error: true });
          setInput("");
        });
    }
  };

  return (
    <div className="App">
      <h1 className="app-name">Weather App</h1>
      <section className="search-bar">
        <input
          type="text"
          className="city-search"
          placeholder="Enter City Name"
          name="query"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={search}
        />
      </section>
      {weather.loading && (
        <>
          <br />
          <br />
          <Oval type="Oval" color="black" height={100} width={100} />
        </>
      )}
      {weather.error && (
        <>
          <br />
          <br />
          <span className="error-message">
            <FontAwesomeIcon icon={faFrown} />
            <span style={{ fontSize: "1.25rem" }}>City not found</span>
          </span>
        </>
      )}
      {weather && weather.data && weather.data.main && (
        <section>
          <div className="city-name">
            <h2>
              {weather.data.name}, <span>{weather.data.sys.country}</span>
            </h2>
          </div>
          <div className="date">
            <span>{getDate()}</span>
          </div>
          <div className="icon-temp">
            <img
              className=""
              src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
              alt={weather.data.weather[0].description}
            />
            {Math.round(weather.data.main.temp)}
            <sup className="deg">°C</sup>
          </div>
          <div className="des-wind">
            <p>{weather.data.weather[0].description.toUpperCase()}</p>
            <p>Wind Speed: {weather.data.wind.speed}m/s</p>
          </div>
        </section>
      )}
    </div>
  );
}
