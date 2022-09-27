var key = '8f0ea131a44aed6e2978f41f424ad93a';
var lat = '';
var lon = '';
var bigCard = document.getElementById('selectedWeather');
var city = '';


navigator.geolocation.getCurrentPosition(position => {
    let { latitude: lat, longitude: lon } = position.coords;

    console.log(lat);
    console.log(lon);
fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=imperial`)
    .then(function (response) {
        return(response.json())
    })
    .then(function (data) {
        genSelectedWeather(data)
    })
})

function genSelectedWeather(response) {
    console.log(response);
    bigCard.innerHTML = `<div class="container borderBox noML noPL widthP mG"><h1 style="display:inline;" class="spaceCurrentWeather">${response.name}</h1><img src="http://openweathermap.org/img/wn/${response.weather[0].icon}@4x.png" style="float:right;"alt="${response.weather[0].description}"/><p class="spaceCurrentWeather">Temp: ${response.main.temp}&deg;C</p><p class="spaceCurrentWeather">Wind: ${response.wind.speed} MPH</p><p class="spaceCurrentWeather">Humidity: ${response.main.humidity} %</p>`;
}

fetch(`api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}`)
