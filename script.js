var config = config.APIKey;
var searchinput = document.getElementById("searchcityinput");
var btnsearch = document.getElementById("button-addon2");
var currentdaysdata = document.getElementById("currentdaysdata");
var currentcity = document.getElementById("currentcity");
var cityNameEl = document.getElementById("cityName");
var currentTempEl = document.getElementById("currenttemp");
var currentHumidityEl = document.getElementById("currenthumidty");
var currentWindEel = document.getElementById("currentwind");
var currentDay = document.getElementById("today");
var currentDescription = document.getElementById("description");
var currentIcon = document.getElementById("dailyIcon");
var weather = {};

btnsearch.addEventListener("click", click);
function click() {
  //Need to add preventdefault here?
  var searchinput = document.getElementById("searchcityinput");
  var city = searchinput.value;
  getApi(city);
  console.log(city);
}

function getApi(city) {
  console.log(city);
  var requestUrl =
    "http://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&appid=" +
    config;
  var city = searchinput.value;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      weather.name = data.city.name;
      weather.data = data.list;
      // var currentdaysdata = getElementById("currentdaysdata");
      // currentdaysdata.textContent = data.current.temp;
      // currentdaysdata.textContent = data.current.wind;
      // currentdaysdata.textContent = data.current.humidty;
      displayWeather();
    });
}

function displayWeather() {
  for (let i = 0; i < weather.data.length; i++) {
    var date = new Date(weather.data[i].dt * 1000);
    var days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
    var newDay = days[date.getDay()];
    var newDate = weather.data[i].dt_txt.slice(0, 10);
    weather.data[i].dt = newDay;
    weather.data[i].dt_txt = newDate;
  }

  currentDay.textContent = `${weather.data[0].dt_txt}`;
  cityNameEl.textContent = `${weather.name}`;
  currentDescription.textContent = `${weather.data[0].weather[0].description}`;
  currentTempEl.textContent = `${Math.floor(
    ((weather.data[0].main.feels_like - 273) * 9) / 5 + 32
  )}° F`;
  currentHumidityEl.textContent = `Humidity: ${weather.data[0].main.humidity}%`;
  currentWindEel.textContent = `Wind-Speed: ${weather.data[0].wind.speed}mph`;
  //need to add icons to library
  // currentIcon.textContent = `<img src="./Assets/Icons/${weather.data[0].weather[0].icon}.png" />`;
}

// getApi(requestUrl);

// Don't think I need this
// var convertLatLon =
//   "http://api.openweathermap.org/geo/1.0/direct?q=" +
//   lat +
//   "&" +
//   lon +
//   "&appid=" +
//   APIKey;

// function getApi(latLon) {
//   console.log(latLon);
//   fetch(convertLatLon).then(function (response) {
//     if (response.ok) {
//       var city = response.json().then(function (data) {
//         console.log(data);
//         getApi(city);
//       });
//     }
//   });
// }
