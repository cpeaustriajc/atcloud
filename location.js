async function getCurrentLocation() {
	return new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject)
	})
}

const { coords } = await getCurrentLocation()

export { coords }
