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
var historyBtn = document.getElementById("history-btn");
var searchHistory = document.getElementById("searchHistory");
var historyTitle = document.getElementById("historyTitle");
var forecast = document.querySelectorAll(".forecast");
var forecastDays = document.querySelectorAll(".forecastDays");
var dayOneEl = document.getElementById("dayone");
var dayTwoEl = document.getElementById("daytwo");
var dayThreeEl = document.getElementById("daythree");
var dayFourEl = document.getElementById("dayfour");
var dayFiveEl = document.getElementById("dayfive");
var weather = {};
var titleHist = false;
var histList = [];
var historyBtn = document.querySelector("data-search");

btnsearch.addEventListener("click", click);
function click() {
  var searchinput = document.getElementById("searchcityinput");
  var city = searchinput.value;
  getApi(city);
  console.log(city);
  dayOneEl.textContent = "";
  dayTwoEl.textContent = "";
  dayThreeEl.textContent = "";
  dayFourEl.textContent = "";
  dayFiveEl.textContent = "";
  // window.localStorage.setItem("history", JSON.stringify(city));

  // var histCities = JSON.stringify(city);
  histList.push(city);
  console.log(histList);

  localStorage.setItem("data", JSON.stringify(histList));
}

$("data-search").on("click", clickHistory);
function clickHistory() {
  console.log("button was clicked");
  let search = historyBtn.getAttribute("data-search");
  console.log(search);
  getApi(histCity);
  dayOneEl.textContent = "";
  dayTwoEl.textContent = "";
  dayThreeEl.textContent = "";
  dayFourEl.textContent = "";
  dayFiveEl.textContent = "";
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
      console.log(weather);
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
  currentDay.textContent = `Today: ${weather.data[0].dt}`;
  currentDescription.textContent = `Weather: ${weather.data[0].weather[0].description}`;
  currentTempEl.textContent = `Temp: ${Math.floor(
    ((weather.data[0].main.feels_like - 273) * 9) / 5 + 32
  )}° F`;
  currentHumidityEl.textContent = `Humidity: ${weather.data[0].main.humidity}%`;
  currentWindEel.textContent = `Wind: ${weather.data[0].wind.speed} mph`;
  //need to add icons to library
  // currentIcon.textContent = `<img src="./Assets/Icons/${weather.data[0].weather[0].icon}.png" />`;

  //To pull 5 day forecast
  var dayOne = document.createElement("div");
  dayOne.setAttribute("class", "forecastDays");
  dayOne.textContent = `${weather.data[5].dt} Temp: ${Math.floor(
    ((weather.data[5].main.feels_like - 273) * 9) / 5 + 32
  )}° F Humidity: ${weather.data[5].main.humidity}% Wind: ${
    weather.data[5].wind.speed
  } mph`;
  dayOneEl.append(dayOne);
  dayOneEl.setAttribute("style", "display:block");

  var dayTwo = document.createElement("div");
  dayTwo.setAttribute("class", "forecastDays");
  dayTwo.textContent = `${weather.data[14].dt} Temp: ${Math.floor(
    ((weather.data[14].main.feels_like - 273) * 9) / 5 + 32
  )}° F Humidity: ${weather.data[5].main.humidity}% Wind: ${
    weather.data[14].wind.speed
  } mph`;
  dayTwoEl.append(dayTwo);
  dayTwoEl.setAttribute("style", "display:block");

  var dayThree = document.createElement("div");
  dayThree.setAttribute("class", "forecastDays");
  dayThree.textContent = `${weather.data[20].dt} Temp: ${Math.floor(
    ((weather.data[20].main.feels_like - 273) * 9) / 5 + 32
  )}° F Humidity: ${weather.data[5].main.humidity}% Wind: ${
    weather.data[20].wind.speed
  } mph`;
  dayThreeEl.append(dayThree);
  dayThreeEl.setAttribute("style", "display:block");

  var dayFour = document.createElement("div");
  dayFour.setAttribute("class", "forecastDays");
  dayFour.textContent = `${weather.data[29].dt} Temp: ${Math.floor(
    ((weather.data[29].main.feels_like - 273) * 9) / 5 + 32
  )}° F Humidity: ${weather.data[29].main.humidity}% Wind: ${
    weather.data[29].wind.speed
  } mph`;
  dayFourEl.append(dayFour);
  dayFourEl.setAttribute("style", "display:block");

  var dayFive = document.createElement("div");
  dayFive.setAttribute("class", "forecastDays");
  dayFive.textContent = `${weather.data[37].dt} Temp: ${Math.floor(
    ((weather.data[37].main.feels_like - 273) * 9) / 5 + 32
  )}° F Humidity: ${weather.data[5].main.humidity}% Wind: ${
    weather.data[37].wind.speed
  } mph`;
  dayFiveEl.append(dayFive);
  dayFiveEl.setAttribute("style", "display:block");

  //Puts the previously searched cities in the lefthand column
  // if (titleHist === false) {
  //   var title = document.createElement("div");
  //   historyTitle.append(title);
  //   titleHist = true;
  // }
  // for (let i = 0; i < histList.length; i++) {
  //   var history = document.createElement("button");
  //   history.textContent = `${window.localStorage
  //     .getItem("data", histList[i])
  //     .split('"')}`;
  //   historyBtn.append(history);
  //   historyBtn.setAttribute("style", "display:block");
  // }

  function initHistory() {
    var storedHistory = localStorage.getItem("data", histList);
    console.log(storedHistory);
    if (storedHistory) {
      var histList = [];
      histList = JSON.parse(storedHistory);
      console.log(histList);
      renderHistory(histList);
    }
  }
  function renderHistory(histList) {
    var title = document.createElement("div");

    title.innerHTML = "";
    historyTitle.innerHTML = "";

    for (let i = 0; i < histList.length; i++) {
      if (i < histList.length) {
        var titleBtn = document.createElement("button");
        titleBtn.setAttribute("data", histList[i]);
        titleBtn.setAttribute("data-search", histList[i]);
        titleBtn.textContent = histList[i];
        historyTitle.append(titleBtn);
        console.log(histList[i]);
      }

      //  history.textContent = `${window.localStorage
      //    .getItem("data", histList[i])
      //    .split('"')}`;
      //  historyBtn.append(history);
      //  historyBtn.setAttribute("style", "display:block");
    }
  }
  initHistory();
  // button.addEventListener("click", getApi);
}

// getApi(requestUrl);
