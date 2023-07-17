/**
 * @typedef {Object} OpenWeatherResponse
 * @property {Object} coord
 * @property {number} coord.lon
 * @property {number} coord.lat
 * @property {Object[]} weather
 * @property {number} weather[].id
 * @property {string} weather[].main
 * @property {string} weather[].description
 * @property {string} weather[].icon
 * @property {string} base
 * @property {Object} main
 * @property {number} main.temp
 * @property {number} main.feels_like
 * @property {number} main.temp_min
 * @property {number} main.temp_max
 * @property {number} main.pressure
 * @property {number} main.humidity
 * @property {number} main.sea_level
 * @property {number} main.grnd_level
 * @property {number} visibility
 * @property {Object} wind
 * @property {number} wind.speed
 * @property {number} wind.deg
 * @property {number} wind.gust
 * @property {Object} clouds
 * @property {number} clouds.all
 * @property {number} dt
 * @property {Object} sys
 * @property {number} sys.type
 * @property {number} sys.id
 * @property {string} sys.country
 * @property {number} sys.sunrise
 * @property {number} sys.sunset
 * @property {number} timezone
 * @property {number} id
 * @property {string} name
 * @property {number} cod
 */

const root = document.querySelector('#app')


const loading = document.createElement('div')
loading.className = 'loading'
loading.textContent = 'Loading...'
root.appendChild(loading)

/**
 * Fetches weather data from the API
 *
 * @param {number} lat Latitude
 * @param {number} lon Longitude
 * @returns {Promise<OpenWeatherResponse>} Weather data
 */
async function getCurrentWeatherData(lat, lon) {
	const res = await fetch('/api/weather', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ lat, lon })

	})
	const data = await res.json()

	return data
}

async function getCurrentLocation() {
	return new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject)
	})
}

const { coords } = await getCurrentLocation()

function toCelsius(temp) {
	return temp - 273.15
}

const currentWeatherData = await getCurrentWeatherData(coords.latitude, coords.longitude)
console.log(currentWeatherData)
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
