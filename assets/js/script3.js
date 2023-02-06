// Add your own API key between the ""
var APIKey = "72380dfb30d88ca9844eebc1d2827077";

// Here we are building the URL we need to query the database
// var queryManilaURL = "https://api.openweathermap.org/data/2.5/weather?q=Manila&appid=" + APIKey;
// console.log(queryManilaURL);
// $.ajax({
//   url: queryURL,
//   method: "GET"
// }).then(function(manilaQuery) {
//   console.log(manilaQuery);
// });
//query using geographical coordinates
//api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
//query using geocoding via openweather api
//http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}


//console.log(searchInput);

//determine what city is being searched
function getSearchTextValue(){
  var searchInput = $("#search-input").val();
  localStorage.setItem('searchText', searchInput);}
$("#search-button").on('click', function(){getSearchTextValue()});
readText = localStorage.getItem('searchText');
console.log(readText);
$("#search-input").val(readText);

//use the searched item in api url query
var cityName = readText;

var countryCode;
var getGeoLocURL = "http://api.openweathermap.org/geo/1.0/direct?q="+cityName+"&limit=5&appid="+APIKey;
$.ajax({
  url: getGeoLocURL,
  method: "GET"
}).then(function(geoLoc) {
  console.log(geoLoc);
  var geoLocArray = geoLoc
  // console.log(geoLocArray[0].lat);
  localStorage.setItem('lat',geoLocArray[0].lat);
  // console.log(geoLocArray[0].lon);
  localStorage.setItem('lon',geoLocArray[0].lon);
  // console.log(geoLocArray[0].name);
  localStorage.setItem('city',geoLocArray[0].name);
  // console.log(geoLocArray[0].country);
  localStorage.setItem('country',geoLocArray[0].country);
  return geoLocArray;
});

//url query output for use on dashboard = city, temp, wind, humidity
var city = localStorage.getItem('city');
var country = localStorage.getItem('country');
var lat = localStorage.getItem('lat');
var lon = localStorage.getItem('lon');
var temp = localStorage.getItem('temp');
var wind = localStorage.getItem('wind');
var humidity = localStorage.getItem('humidity');
// console.log(city);
// console.log(country);
// console.log(lat);
// console.log(lon);


var forecastQueryURL = "http://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid="+APIKey;
$.ajax({
  url:forecastQueryURL,
  method: "GET"
}).then(function(response) {

  console.log(response);

});


var queryCityURL = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+APIKey;

$.ajax({
  url: queryCityURL,
  method: "GET"
}).then(function(response) {
  console.log(response);
  localStorage.setItem('lat',geoLocArray[0].lat);
  localStorage.setItem('lon',geoLocArray[0].lon);
  localStorage.setItem('city',geoLocArray[0].name);
  localStorage.setItem('country',geoLocArray[0].country);


});