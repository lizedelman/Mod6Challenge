var APIKey = "6561d55b38895db2712787639eb1bdd9";
var city;
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

//render the data object to html elements. data.current.wind or temp etc

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

//find out what needs to be here for sure
var requestUrl =
  "api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + APIKey;

function getApi(city) {
  console.log(city);
  fetch(requestUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        var currentdaysdata = getElementById();
        currentdaysdata.textContent = data.current.temp;
        currentdaysdata.textContent = data.current.wind;
        currentdaysdata.textContent = data.current.humidty;
        displayWeather();
      });
    }
  });

  function displayWeather() {
    console.log("display weather");
  }
}

// getApi(requestUrl);
