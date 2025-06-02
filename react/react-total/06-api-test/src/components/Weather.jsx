import React, { useContext } from 'react'
import WeatherContext from '../context/WeatherContext'

const Weather = () => {
    const { selectCountry, setSelectCountry, weatherData, setWeatherData } =
      useContext(WeatherContext);
  return (
      <div className='weather-wrap'>
          <h2>국가별 날씨</h2>
          <select value={selectCountry}>
              <Object.keys(contries).map((country)=>
              <option key=courtries)eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
          </select>
      
    </div>
  )
}

export default Weather
