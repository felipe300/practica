function loadStats () {
	const randomNumber = (min, max) => Math.random() * (max - min) + min

	var chart = new CanvasJS.Chart("chartContainer", {
		theme: "light1", // "light1", "light2", "dark1"
		animationEnabled: true,
		exportEnabled: true,
		title: {
			text: "Stats"
		},
		axisX: {
			margin: 10,
			labelPlacement: "inside",
			tickPlacement: "inside"
		},
		axisY2: {
			title: "Views (points)",
			titleFontSize: 18,
			includeZero: true,
			suffix: "pts"
		},
		data: [{
			type: "bar",
			axisYType: "secondary",
			yValueFormatString: "#,###.##points",
			indexLabel: "{y}",
			dataPoints: [
				{ label: "Mana", y: randomNumber(10, 150) },
				{ label: "Defense", y: randomNumber(10, 150) },
				{ label: "Attack", y: randomNumber(10, 150) },
				{ label: "HP", y: randomNumber(80, 150) }
			]
		}]
	})
	chart.render()

}

const mainTitle = document.getElementById("mainTitle")
const form = document.getElementById("digimonForm")

function clearText () {
	document.getElementById('digimonName').value = ""
}

form.addEventListener("submit", async (e) => {
	e.preventDefault()

	const url = `https://digimon-api.vercel.app/api/digimon`
	const response = await fetch(url)
	const digimon = await response.json()

	let digimonName = document.getElementById("digimonName").value
	// TODO: fix bad digimon name
	const name = digimonName[0].toUpperCase() + digimonName.substring(1)

	const getDigimon = digimon.filter((digi) => digi.name === name)

	try {
		let cardTitle = document.querySelector("#info-digimon .card-title")
		cardTitle.innerHTML = (getDigimon[0].name).toUpperCase()

		let cardLevel = document.getElementById("level")
		cardLevel.innerHTML = (getDigimon[0].level).toUpperCase()

		let cardImage = document.querySelector("#info-digimon img")
		cardImage.setAttribute("src", getDigimon[0].img)

		loadStats()
		clearText()
	} catch (err) {
		console.log(err)
		clearText()
	}
})

const favoriteDigimons = document.getElementById("favoriteDigimons")

favoriteDigimons.addEventListener("click", async () => {
	const url = `https://digimon-api.vercel.app/api/digimon`
	const response = await fetch(url)
	const digimon = await response.json()

	let digiOne = digimon.filter((digi) => digi.name === "Patamon")

	// an array in case to add more
	const favorites = [digiOne]
	let fav = document.getElementById("fav")
	fav.innerHTML = ""

	let acc = ''
	favorites.forEach((digimon, i) => {
		console.log(digimon[i])
		let el = `
		<p class="h5">${digimon[0].name}</p>
		<img src="${digimon[0].img}" class="d-block w-100" alt="${digimon[0].name}">`
		acc += el
	})
	fav.innerHTML += acc
})