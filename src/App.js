//importing of useState
import React, { useState } from "react";

import "./App.css";

//below const will allow us to use the weather api
const api = {
  key: "96e0e6e5968114d3c20ccd4156b7a2db",

  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  //creating useState variable that will used in the fetch method
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState("");

  const search = (evt) => {
    if (evt.key === "Enter") {
      //below the fetch GET request is set which will extract the data from the weather api and return it in a json format
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setQuery(" ");
          setWeather(result);
          console.log(result);
        });
    }
  };

  //this function will provide the current date on the weather app
  const dateBuilder = (d) => {
    let months = [
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
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    // below returns full current date to the weather app
    return ` ${day} ${date} ${month} ${year}`;
  };
  return (
    //below links import a google font and if weather is more than 19 degrees the background image changes. the functions written above are called in the below return section
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 19
            ? "appWarm"
            : "appCold"
          : "appCold"
      }
    >
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Rubik+Wet+Paint&display=swap"
        rel="stylesheet"
      />
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
              <div className="weather-box">
                <div className="temp "> {Math.round(weather.main.temp)}°c </div>
                <div className="weather">{weather.weather[0].main}</div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;

/*
References
https://home.openweathermap.org/api_keys
https://www.youtube.com/watch?v=GuA0_Z1llYU
https://reactjs.org/docs/lifting-state-up.html
https://www.36n.co/how-to
*/
