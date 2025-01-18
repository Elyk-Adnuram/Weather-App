// Separate API configuration for better maintainability
const API_CONFIG = {
  baseURL: "https://api.openweathermap.org/data/2.5/weather",
  params: {
    units: "metric",
    appid: process.env.REACT_APP_API_KEY,
  },
};

export default API_CONFIG;
