var url = "http://api.openweathermap.org";
var apiKey = "731ac8af444163b219a889c601c050eb";
var searchHistory = [];
var searchForm = document.querySelector("#search-form");
var searchInput = document.querySelector("#search-input");
var today = document.querySelector("#today");
var forcast = document.querySelector("#forecast");
var searchHistoryContainer = document.querySelector("#search-form");
dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);

function renderCurrentWeather(city, weather) {
  var date = dayjs().format("M/D/YYYY");
  var temp = weather.main.temp;
  var wind = weather.wind.speed;
  var humidity = weather.main.humidity;
  var iconUrl = `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`;
  var iconDescription = weather.weather[0].description || weather[0].main;

  var card = document.createElement("div");
  var cardBody = document.createElement("div");
  var heading = document.createElement("h2");
  var weatherIcon = document.createElement("img");
  var tempEl = document.createElement("p");
  var windEl = document.createElement("p");
  var humidityEl = document.createElement("p");

  card.setAttribute("class", "card");
  cardBody.setAttribute("class", "card-body");
  card.append(cardBody);

  heading.setAttribute("class", "h3 card-title");
  tempEl.setAttribute("class", "card-text");
  windEl.setAttribute("class", "card-text");
  humidityEl.setAttribute("class", "card-text");

  heading.textContent = `${city} ${date}`;
  weatherIcon.setAttribute("src", iconUrl);
  weatherIcon.setAttribute("alt", iconDescription);
  weatherIcon.setAttribute("class", "weather-img");
  heading.append(weatherIcon);
  tempEl.textContent = `Temp: ${temp}F`;
  windEl.textContent = `Wind: ${wind}MPH`;
  humidityEl.textContent = `Humidity: ${humidity}%`;
  cardBody.append(heading,tempEl,windEl,humidityEl);
  today.innerHTML = ""
  today.append(card)
}
//remember to make renderForcast dynamic/make a function to duplicate
function renderItems(city, data) {
  renderCurrentWeather(city, data.list[0], data.city.timezone);

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

function handleHistoryClick(e) {
  if (!e.target.matches(".btn-history")) {
    return;
  }
  var btn = e.target;
  var search = btn.getAttribute("data-search");
  fetchCoordinates(search);
}

searchForm.addEventListener("submit", handleSearchSubmit);
