// fetch("https://api.openweathermap.org/data/2.5/forecast?q=minneapolis&units=imperial&appid=731ac8af444163b219a889c601c050eb")
//     .then(response => response.json())
//     .then(data => {
//         for (i = 0; i < 5; i++) {
//             document.getElementById("day" + (i + 1) + "min").innerHTML = "Min:" + Number(data.list[i].main.temp_min - 294.26)
//         }
//     });

var url = "http://api.openweathermap.org";
var apiKey = "731ac8af444163b219a889c601c050eb";
var searchHistory = [];
var searchForm = document.querySelector("#search-form");
var searchInput = document.querySelector("#search-input");
var today = document.querySelector("#today");
var forcast = document.querySelector("#forecast");
var searchHistoryContainer = document.querySelector("#search-form");
dayjs.extend(window.dayjs_plugin_utc)
dayjs.extend(window.dayjs_plugin_timezone)

// //default city
// let lat = 44.954445;
// let lon = -93.091301;
// let city = `https://api.openweathermap.org/data/2.5/weather?lat=44.954445&lon=-93.091301&appid=${apiKey}`
// let city = "https://api.openweathermap.org/data/2.5/weather?lat=44.954445&lon=-93.091301&appid=731ac8af444163b219a889c601c050eb"
//create vars for DOM elements refs
//create function to display search list
//create function to render search hisoty
//create for loop to go through search history
//make button for every item in search history then append to search history
//append buttons to search history
//function to update history in local storage
//call rendersearch so it shows recent history
//function to call history in local storage
//function that renders the current weather (expect it to be 30-40 lines)
//function that renders forcast card
//function that duplicates for each day x5
//render items
//function that
function renderCurrentWeather(city,weather){
    var date = dayjs().format("M/D/YYYY")
    var temp = weather.main.temp
    var wind = weather.wind.speed
    var humidity = weather.main.humidity
    var iconUrl = `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`
    var iconDescription = weather.weather[0].description || weather[0].main

    var card = document.createElement("div")
    var cardBody = document.createElement("div")
    var heading = document.createElement("h2")
    var weatherIcon = document.createElement("img")
    var tempEl = document.createElement("p")
    var windEl = document.createElement("p")
    var humidityEl = document.createElement("p")

    card.setAttribute("class","card")
    cardBody.setAttribute("class","card-body")
    card.append(cardBody)

    heading.setAttribute("class", "h3 card-title")
    tempEl.setAttribute("class","card-text")
    windEl.setAttribute("class","card-text")
    humidityEl.setAttribute("class","card-text")

}



function renderItems(city, data) {
  renderCurrentWeather(city, data.list[0], data.city.timezone);
  renderForecast(data.list);
}
function fetchWeather(location) {
  var { lat } = location;
  var { lon } = location;
  var city = location.name;
  var apiUrl = `${url}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
  fetch(apiUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      renderItems(city, data);
    })
    .catch(function (err) {
      console.error(err);
    });
}

function fetchCoordinates(search) {
  var apiUrl = `${url}/geo/1.0/direct?q=${search}&limit=5&appid=${apiKey}`;
  fetch(apiUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      if (!data[0]) {
        alert("location not found");
      } else {
        // appendToHistory(search);
        fetchWeather(data[0]);
      }
    })
    .catch(function (err) {
      console.error(err);
    });
}
function handleSearchSubmit(e) {
  if (!searchInput.value) {
    return;
  }

  e.preventDefault();
  var search = searchInput.value.trim();
  fetchCoordinates(search);
  searchInput.value = "";
}

function handleHistoryClick(e){
    if(!e.target.matches(".btn-history")){
        return 
    }
    var btn = e.target
    var search = btn.getAttribute("data-search")
    fetchCoordinates(search)
}



searchForm.addEventListener("submit", handleSearchSubmit)
