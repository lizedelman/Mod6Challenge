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
var searchHistory = document.getElementById("searchHistory");
var historyTitle = document.getElementById("historyTitle");
var weather = {};
var titleHist = false;

btnsearch.addEventListener("click", click);
function click() {
  //Need to add preventdefault here?
  var searchinput = document.getElementById("searchcityinput");
  var city = searchinput.value;
  getApi(city);
  console.log(city);

  window.localStorage.setItem("history", JSON.stringify(city));
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
      displayWeather();
      searchinput.value = "";
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

  cityNameEl.textContent = `${weather.name}`;
  currentDay.textContent = `${weather.data[0].dt_txt}`;
  currentDescription.textContent = `Today: ${weather.data[0].weather[0].description}`;
  currentTempEl.textContent = `Temp: ${Math.floor(
    ((weather.data[0].main.feels_like - 273) * 9) / 5 + 32
  )}° F`;
  currentHumidityEl.textContent = `Humidity: ${weather.data[0].main.humidity}%`;
  currentWindEel.textContent = `Wind-Speed: ${weather.data[0].wind.speed}mph`;
  //need to add icons to library
  // currentIcon.textContent = `<img src="./Assets/Icons/${weather.data[0].weather[0].icon}.png" />`;

  //Puts the previously searched cities in the lefthand column
  if (titleHist === false) {
    var title = document.createElement("div");
    title.textContent = `Search history:`;
    historyTitle.append(title);
    titleHist = true;
  }
  var history = document.createElement("div");
  history.textContent = `${window.localStorage
    .getItem("history")
    .split('"')
    .join("")}`;
  searchHistory.append(history);
}

//Not working yet
//   if (titleHist === false) {
//   var titleHist = document.getElementById("historydiv");
//   titleHist.textContent = `<p>This is your search history:</p>`;
//   titleHist = true;
// }
// var history = document.getElementById("searchhistory");
// history.textContent = window.localStorage.getItem("history");

// getApi(requestUrl);
