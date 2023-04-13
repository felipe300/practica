const mainTitle = document.getElementById("mainTitle")
const form = document.getElementById("digimonForm")

function clearText () {
	document.getElementById('digimonName').value = ""
}

form.addEventListener("submit", async (e) => {
	e.preventDefault()
	let digimonName = document.getElementById("digimonName").value

	const url = `https://digimon-api.vercel.app/api/digimon`
	const response = await fetch(url)
	const digimon = await response.json()
	// TODO: fix bad digimon name
	const name = digimonName[0].toUpperCase() + digimonName.substring(1)

	const getDigimon = digimon.filter((digi) => digi.name === name ? digi : '')

	try {
		let cardTitle = document.querySelector("#info-digimon .card-title")
		cardTitle.innerHTML = (getDigimon[0].name).toUpperCase()

		let cardLevel = document.getElementById("level")
		cardLevel.innerHTML = (getDigimon[0].level).toUpperCase()

		let cardImage = document.querySelector("#info-digimon img")
		cardImage.setAttribute("src", getDigimon[0].img)

		// let stats = document.getElementById("stats")
		// stats.innerHTML = ""

		// let acc = ""
		// digimon.stats.forEach((stat) => {
		// 	let el = `<p>${stat.stat.name} => ${stat.base_stat}</p>`
		// 	acc += el
		// })
		// stats.innerHTML += acc
		clearText()
	} catch (err) {
		console.log(err)
	}
})
