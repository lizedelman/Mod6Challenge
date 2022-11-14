var config = config.APIKey;
var searchinput = document.getElementById("searchcityinput");
var btnsearch = document.getElementById("button-addon2");
var cityname = document.querySelector(".cityname");
var citytemp = document.querySelector(".citytemp");
var citywind = document.querySelector(".citywind");
var cityhumidity = document.querySelector(".cityhumidty");

btnsearch.addEventListener("click", click);
function click() {
  //Need to add preventdefault here?
  console.log("buttonwasclicked");
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
      displayWeather();
    });
}

function displayWeather() {
  var currentdaysdata = document.getElementById("currentdaysdata");

  var time = weather["dt"] * 1000;
  var date = new Date(time).toLocaleDateString("en-US");
  var iconCode = weather["weather"]["0"]["icon"];
  var desc = weather["weather"]["0"]["description"];
  var iconURL = "https://openweathermap.org/img/wn/" + iconCode + "@2x.png";
  var cityname = weather["name"] + " " + date;
  var citytemp = "Temperature: " + weather["main"]["temp"] + " °F";
  var citywind = "Wind: " + weather["wind"]["speed"] + " mph";
  var cityhumidity = "Humidity: " + weather["main"]["humidity"] + " %";

  currentdaysdata.textContent = data.current.temp;
  currentdaysdata.textContent = data.current.wind;
  currentdaysdata.textContent = data.current.humidty;
  weatherIconEl.innerHTML = `<img src=` + iconURL + `>` + " " + desc;
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
