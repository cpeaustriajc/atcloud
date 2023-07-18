async function getCurrentWeatherData(lat, lon) {
	const res = await fetch('/api/weather', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ lat, lon }),
	})
	const data = await res.json()

	return data
}

export { getCurrentWeatherData }
