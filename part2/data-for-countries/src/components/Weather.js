import axios from "axios"
import { useEffect, useState } from "react"

const Weather = ({capital}) => {
  const [weather, setWeather] = useState([])
  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`)
      .then(response => (
        setWeather(response.data)
      ))
  }, [])

  if (weather.length !== 0) {
    return (
      <div>
        <h1>
          Weather in {capital}
        </h1>
        <p>
          temperatur {weather.main.temp} Celcius
        </p>
        <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
        <p>
          wind {weather.wind.speed} m/s
        </p>
      </div>
    )
  }

  return (
    <div>
    </div>
  )
}

export default Weather