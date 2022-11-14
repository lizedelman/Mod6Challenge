var APIKey = "6561d55b38895db2712787639eb1bdd9";
var searchinput = document.getElementById("searchcityinput");
var btnsearch = document.getElementById("button-addon2");
var lat;
var lon;

btnsearch.addEventListener("click", click);
function click() {
  //Need to add preventdefault here?
  console.log("buttonwasclicked");
  var searchinput = document.getElementById("searchcityinput");
  var city = searchinput.value;
  getApi(city);
  console.log(city);
}

//lat & long to get: reqeust to url to get lat & lon and then run another reuqest to get the weather
var convertLatLon =
  "http://api.openweathermap.org/geo/1.0/direct?q=" +
  lat +
  "&" +
  lon +
  "&appid=" +
  APIKey;

function getApi(latLon) {
  console.log(latLon);
  fetch(convertLatLon).then(function (response) {
    if (response.ok) {
      var city = response.json().then(function (data) {
        console.log(data);
        getApi(city);
      });
    }
  });
}

//Not working correctly

function getApi(city) {
  console.log(city);
  var requestUrl =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    APIKey;
  var city = searchinput.value;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var currentdaysdata = document.getElementById("currentdaysdata");
      currentdaysdata.textContent = data.current.temp;
      currentdaysdata.textContent = data.current.wind;
      currentdaysdata.textContent = data.current.humidty;
      displayWeather();
    });
}

// getApi(requestUrl);
