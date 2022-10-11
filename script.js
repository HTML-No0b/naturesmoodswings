var url = "http://api.openweathermap.org";
var apiKey = "731ac8af444163b219a889c601c050eb";
var searchHistory = [];
const searchEl = document.createElement('div')
//default city
let lat = 44.954445;
let lon = -93.091301;

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
function renderItems(city, data) {
    renderCurrentWeather(city, data.list[0], data.city.timezone);
    renderForecast(data.list);
  };
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