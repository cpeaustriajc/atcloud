class App {
	constructor() {
		this.root = document.querySelector('#app')
	}

	render() {
		const template = `<h1>Hello World</h1>`
		this.root.innerHTML = template
	}
}

const app = new App()

app.render()
