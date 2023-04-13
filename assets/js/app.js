const mainTitle = document.getElementById("mainTitle")
const form = document.getElementById("digimonForm")

form.addEventListener("submit", async (e) => {
	e.preventDefault()
	const digimonName = document.getElementById("digimonName").value

	const url = `https://pokeapi.co/api/v2/pokemon/${digimonName.toLowerCase()}`
	const response = await fetch(url)
	const digimon = await response.json()

	try {
		let cardTitle = document.querySelector("#info-digimon .card-title")
		cardTitle.innerHTML = (digimon.name).toUpperCase()

		let cardImage = document.querySelector("#info-digimon img")
		cardImage.setAttribute("src", digimon.sprites.front_default)

		let stats = document.getElementById("stats")
		stats.innerHTML = ""

		let acc = ""
		digimon.stats.forEach((stat) => {
			let el = `<p>${stat.stat.name} => ${stat.base_stat}</p>`
			acc += el
		})
		stats.innerHTML += acc
	} catch (err) {
		console.log(err)
	}
})
