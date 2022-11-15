var config = config.APIKey;
var searchinput = document.getElementById("searchcityinput");
var btnsearch = document.getElementById("button-addon2");
var currentdaysdata = document.getElementById("currentdaysdata");
var currentcity = document.getElementById("currentcity");
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
    "http://api.openweathermap.org/data/2.5/weather?q=" +
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
      var currentdaysdata = getElementById("currentdaysdata");
      currentdaysdata.textContent = data.current.temp;
      currentdaysdata.textContent = data.current.wind;
      currentdaysdata.textContent = data.current.humidty;
      displayWeather();
    });
}

function displayWeather() {}

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
