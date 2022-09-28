var key = '8f0ea131a44aed6e2978f41f424ad93a';
var lat = '';
var lon = '';
var bigCard = document.getElementById('selectedWeather');
var city = 'Atlanta';
var cards = '';
var searchBtn = document.getElementById('button');
var btnCon = '';
var historyBtn = document.getElementById('histBtn');

function generateSearch() {
    var citySearch = document.getElementById('search').value;
    city = citySearch;
    init(city);
    btnCon = document.getElementById('btnCon');
    var btnConHTML = `<button id='histBtn' onclick="generateSearch()" type="button" class="btn btn-secondary rounded">` + city + `</button>`;
    genHistory(btnCon, btnConHTML);
}

function genHistory(e, str) {
    var citySearch = document.getElementById('search').value;
    city = citySearch;
    var div = document.createElement('div');
    div.innerHTML = str;
    e.appendChild(div.children[0]);
}

function init(city) {
    var cityLoad = city;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityLoad}&appid=${key}&units=imperial`)
        .then(function (response) {
            return(response.json())
        })
        .then(function (data) {
            localStorage.setItem(cityLoad, JSON.stringify(data)),
            genSelectedWeather(data)
        })
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityLoad}&appid=${key}&units=imperial`)
        .then(function (response) {
            return(response.json())
    })
        .then(function (data) {
            genSelectedWeatherCards(data)
    })
}

function genSelectedWeather(response) {
    console.log(response);
    bigCard.innerHTML = `<div class="container borderBox noML noPL widthP mG"><h1 style="display:inline;" class="spaceCurrentWeather">${response.name}</h1><img src="http://openweathermap.org/img/wn/${response.weather[0].icon}@4x.png" style="float:right;"alt="${response.weather[0].description}"/><p class="spaceCurrentWeather">Temp: ${response.main.temp}&deg;F</p><p class="spaceCurrentWeather">Wind: ${response.wind.speed} MPH</p><p class="spaceCurrentWeather">Humidity: ${response.main.humidity} %</p></div><h3 class="noPL mG">5-Day Forecast:</h2>
    <div class="row container noPL noML widthP" id="cards"></div>`;

    cards = document.getElementById('cards');
}

function genSelectedWeatherCards(response) {
    console.log(response)

    //https://bobbyhadz.com/blog/react-map-nested-array
    cards.innerHTML = response.list.map((list, index) => {
        if (index%8 == 0) //returns every 8th index and 0
            return `<div class="col-2 cardBg">
            <h5 class="spaceCurrentWeather">${grabDate(list.dt_txt)}</h5>
            <img src="http://openweathermap.org/img/wn/${list.weather[0].icon}.png" class="spaceCurrentWeather" alt="${list.weather[0].description}"/>
            <p class="spaceCurrentWeather">Temp: ${list.main.temp}&deg;F</p>
            <p class="spaceCurrentWeather">Wind: ${list.wind.speed}MPH</p>
            <p class="spaceCurrentWeather">Humidity: ${list.main.humidity}%</p>
            </div>`;
    }).join('');//removes commas on join
}

function grabDate(dateText) {
    var list = dateText.substring(0, 10).split('-');
    return list[1] + '-' + list[2] + '-' + list [0];
}
init(city);
searchBtn.addEventListener('click', generateSearch);