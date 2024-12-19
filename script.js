
const apiKey = "votre_cle_api"; 
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";


const cityInput = document.getElementById('city');
const getWeatherButton = document.getElementById('getWeather');
const weatherResult = document.getElementById('weatherResult');


async function getWeather() {
    const city = cityInput.value;
    if (!city) {
        weatherResult.textContent = "Veuillez entrer une ville.";
        return;
    }

    try {
        const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric&lang=fr`);
        if (!response.ok) {
            throw new Error("Ville non trouvée");
        }

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        weatherResult.textContent = `Erreur : ${error.message}`;
    }
}


function displayWeather(data) {
    const { name, main, weather } = data;
    const temperature = main.temp;
    const description = weather[0].description;

    weatherResult.innerHTML = `
        <h2>${name}</h2>
        <p>Température : ${temperature} °C</p>
        <p>Conditions : ${description}</p>
    `;
}

getWeatherButton.addEventListener('click', getWeather);