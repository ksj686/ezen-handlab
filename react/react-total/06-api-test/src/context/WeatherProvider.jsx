import React, { useEffect, useState } from "react";
import WeatherContext from "./WeatherContext";

// 선택할 국가
const countries = {
  Korea: "Seoul",
  USA: "New York",
  Japan: "Tokyo",
  France: "Paris",
  Germany: "Berlin",
};

// 날씨 apu
const API_KEY = "23cf5e1bd5401b1f7c667668f8f72c23";

const WeatherProvider = ({ children }) => {
  // 나라 선택
  const [selectCountry, setSelectCountry] = useState("Korea");
  // 날씨
  const [weatherData, setWeatherData] = useState("");

  useEffect(() => {
    const axiosWeather = async () => {
      const city = countries[selectCountry];
      try {
        const response = await axios.get(
          "https://api.openweathermap.org/data/2.5/weather",
          {
            params: {
              q: city,
              appid: API_KEY,
              units: "matric",
              lang: "kr",
            },
          }
        );
        setWeatherData(response.data);
      } catch (error) {
        console.log(error.text);
      }
    };
    axiosWeather();
  }, [selectCountry]);

  return (
    <WeatherContext.Provider
      value={{ selectCountry, setSelectCountry, weatherData, setWeatherData }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherProvider;
