var key = '8f0ea131a44aed6e2978f41f424ad93a';
var lat = '';
var lon = '';

var currW = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;

navigator.geolocation.getCurrentPosition(position => {
    const { latitude, longitude } = position.coords;
    lat = latitude;
    lon = longitude;
    console.log(lat);
    console.log(lon);
});

fetch(currW)
    .then(function (response) {
        console.log(response);
    })

function start() {
    currentWeather();
}

function currentWeather() {
    
    
}
start();
