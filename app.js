const root = document.querySelector('#app')


const loading = document.createElement('div')
loading.className = 'loading'
loading.textContent = 'Loading...'
root.appendChild(loading)

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
