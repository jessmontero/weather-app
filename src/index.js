let currentDayTime = document.querySelector("#day-time");

let date = new Date();

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[date.getDay()];

let hours = ('0' + date.getHours()).slice(-2);
let minutes = ('0' + date.getMinutes()).slice(-2);

let dayTime = `${day} ${hours}:${minutes}`;

currentDayTime.innerHTML = dayTime;

//

function showTemperature(response) {
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
    document.querySelector("#conditions").innerHTML = response.data.weather[0].main;
    document.querySelector("#feels-like").innerHTML = Math.round(response.data.main.feels_like);
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
    console.log(response.data);

}

function search(city) {
    let apiKey = "ddf0440bcec2a49b426ccbeada3e4574";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#search-input").value; 
    search(city);
}

function showPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiKey = "ddf0440bcec2a49b426ccbeada3e4574";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition() {
    document.querySelector("#search-input").value = "";
    navigator.geolocation.getCurrentPosition(showPosition);
}

let form = document.querySelector("#city-search");
form.addEventListener("submit", handleSubmit);

//

function showCentigrade() {
    document.querySelector("#current-temperature").innerHTML = "18";
    document.querySelector("#centigrade").style.color = "#ff7e67";
    document.querySelector("#fahrenheit").style.color = "#35495e";
}

function showFahrenheit() {
    document.querySelector("#current-temperature").innerHTML = "64";
    document.querySelector("#centigrade").style.color = "#35495e";
    document.querySelector("#fahrenheit").style.color = "#ff7e67";
}


let degreesCentigrade = document.querySelector("#centigrade");
let degreesFahrenheit = document.querySelector("#fahrenheit");

degreesCentigrade.addEventListener("click", showCentigrade);
degreesFahrenheit.addEventListener("click", showFahrenheit);

let button = document.querySelector("#current-location-button");
button.addEventListener("click", getCurrentPosition);

search("London");