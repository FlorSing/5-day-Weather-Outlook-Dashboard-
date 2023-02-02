function renderButtons() {
   var a = $("<button>").addClass("cities").text(readText);
    $("#history").append(a);};

var APIKey = "72380dfb30d88ca9844eebc1d2827077";

//determine what city is being searched
function getSearchTextValue(){
  var searchInput = $("#search-input").val();
  localStorage.setItem('searchText', searchInput);}

$("#search-button").on('click', function(){getSearchTextValue()});
readText = localStorage.getItem('searchText');
console.log(readText);
$("#search-input").val(readText);

renderButtons();

//use the searched item in api url query
var cityName = readText;

var countryCode;
var getGeoLocURL = "http://api.openweathermap.org/geo/1.0/direct?q="+cityName+"&limit=5&appid="+APIKey;
$.ajax({
  url: getGeoLocURL,
  method: "GET"
}).then(function(geoLoc) {
  var geoLocArray = geoLoc
  localStorage.setItem('lat',geoLocArray[0].lat);
  localStorage.setItem('lon',geoLocArray[0].lon);
  localStorage.setItem('city',geoLocArray[0].name);
  localStorage.setItem('country',geoLocArray[0].country);
});
var city = localStorage.getItem('city');
var country = localStorage.getItem('country');
var lat = localStorage.getItem('lat');
var lon = localStorage.getItem('lon');

//url query output for use on dashboard = city, temp, wind, humidity
var forecastQueryURL = "http://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid="+APIKey;
$.ajax({
  url:forecastQueryURL,
  method: "GET"
}).then(function(weather) {
  console.log(weather);
  var currWeather = weather
  localStorage.setItem('date',currWeather.list[0].dt);
  localStorage.setItem('temp',currWeather.list[0].main.temp);
  localStorage.setItem('wind',currWeather.list[0].wind.speed);
  localStorage.setItem('humidity',currWeather.list[0].main.humidity);
});

var date = localStorage.getItem('date');
var temp = localStorage.getItem('temp');
var wind = localStorage.getItem('wind');
var humidity = localStorage.getItem('humidity');

console.log(city);
console.log(country);
console.log(lat);
console.log(lon);
console.log(moment.unix(date).format('DD MMM YYYY'));
console.log(temp);
console.log(wind);
console.log(humidity);

