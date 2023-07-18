import { coords } from 'location'
import { getCurrentWeatherData } from 'requests'
import { toCelsius } from 'utils'

const root = document.querySelector('#app')

const loading = document.createElement('div')
loading.className = 'loading'
loading.textContent = 'Loading...'
root.appendChild(loading)


const currentWeatherData = await getCurrentWeatherData(coords.latitude, coords.longitude)
root.removeChild(loading)

const weather = document.createElement('div')
weather.className = 'weather'

const city = document.createElement('h1')
city.textContent = currentWeatherData.name
city.className = 'heading'

const temp = document.createElement('p')
temp.textContent = toCelsius(currentWeatherData.main.temp).toFixed(2) + '°C'
temp.className = 'temp'

root.appendChild(weather)
weather.appendChild(city)
weather.appendChild(temp)
