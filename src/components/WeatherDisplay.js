import { useMemo } from "react";
import DATE_CONFIG from "../configs/DATE_CONFIG";

const WeatherDisplay = ({ data }) => {
  const currentDate = useMemo(() => {
    const date = new Date();
    return `${DATE_CONFIG.days[date.getDay()]} ${date.getDate()}${
      DATE_CONFIG.months[date.getMonth()]
    }`;
  }, []);

  return (
    <div className="weather-content">
      <div className="city-name">
        <h2>
          {data.name}, <span>{data.sys.country}</span>
        </h2>
      </div>
      <div className="date">{currentDate}</div>
      <div className="weather-info">
        <div className="icon-temp">
          <img
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            alt={data.weather[0].description}
            loading="lazy"
          />
          <span>
            {Math.round(data.main.temp)}
            <sup className="deg">°C</sup>
          </span>
        </div>
        <div className="des-wind">
          <p>{data.weather[0].description.toUpperCase()}</p>
          <p>Wind Speed: {data.wind.speed}m/s</p>
        </div>
      </div>
    </div>
  );
};
export default WeatherDisplay;
