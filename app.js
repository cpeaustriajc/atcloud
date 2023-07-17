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

/**
 * Fetches weather data from the API
 *
 * @param {number} lat Latitude
 * @param {number} lon Longitude
 * @returns {Promise<OpenWeatherResponse>} Weather data
 */
async function getCurrentWeatherData(lat, lon) {
	const res = await fetch('/api/weather')
	const data = await res.json()

	return data
}

class App {
	render() {
		const heading = document.createElement('h1')
		heading.textContent = `Test`
		heading.className = 'heading'

		root.appendChild(heading)
	}
}

const app = new App()

app.render()
