
var APIKey = "72380dfb30d88ca9844eebc1d2827077";

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

var queryCityURL = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+APIKey;

$.ajax({
  url: queryCityURL,
  method: "GET"
}).then(function(response) {
  console.log(response);
  localStorage.setItem('city',response.name);
  localStorage.setItem('country',response.country);
  localStorage.setItem('country',response.main.temp);
  localStorage.setItem('country',response.main.temp);


});

//url query output for use on dashboard = city, temp, wind, humidity
var city = localStorage.getItem('city');
var country = localStorage.getItem('country');
var lat = localStorage.getItem('lat');
var lon = localStorage.getItem('lon');
var temp = localStorage.getItem('temp');
var wind = localStorage.getItem('wind');
var humidity = localStorage.getItem('humidity');
