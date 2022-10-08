var url = "http://api.openweathermap.org"
var apiKey = "731ac8af444163b219a889c601c050eb"

function fetchWeather(location) {
    var { lat } = location;
    var { lon } = location;
    var city = location.name;
    var apiUrl = `${url}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
    fetch(apiUrl)
    .then(function(res){
        return res.json();
    })
    .then(function(data){
        renderItems(city,data);
    })
    .catch(function(err){
        console.error(err)
    })
};

function fetchCoordinates(search){
var apiUrl = `${url}/geo/1.0/direct?q=${search}&limit=5&appid=${apiKey}`;
fetch(apiUrl)
.then (function(res){
    return res.json();
})
.then(function(data){
    if (!data[0]){
        alert('location not found')
    }
    else{
        // appendToHistory(search);
        fetchWeather(data[0]);
    }
})
.catch(function(err){
    console.error(err)
})
};
function renderItems(city, data) {
    renderCurrentWeather(city, data.list[0], data.city.timezone);
    renderForecast(data.list);
  };
  fetchCoordinates(Denver);