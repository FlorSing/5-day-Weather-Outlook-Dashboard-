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

function getSearchTextValue(){
  var searchInput = $("#search-input").val();
  localStorage.setItem('searchText', searchInput);}
$("#search-button").on('click', function(){getSearchTextValue()});
readText = localStorage.getItem('searchText');
console.log(readText);
$("#search-input").val(readText);

var cityName = readText;
var countryCode;

var getGeoLocURL = "http://api.openweathermap.org/geo/1.0/direct?q="+cityName+"&limit=5&appid="+APIKey;
$.ajax({
  url: getGeoLocURL,
  method: "GET"
}).then(function(geoLoc) {
  console.log(geoLoc);
  var geoLocArray = geoLoc
  console.log(geoLocArray[0].lat);
  localStorage.setItem('lat',geoLocArray[0].lat)
  console.log(geoLocArray[0].lon);
  localStorage.setItem('lon',geoLocArray[0].lon)
  console.log(geoLocArray[0].name);
  console.log(geoLocArray[0].country);
  //for (i = 0; i < geoLocArray.length; i++) {
  // var citiesList = [];
  // citiesList.push(geoLocArray[i].country);
  // console.log(citiesList);
  // console.log(geoLocArray[i].country)};
  return geoLocArray;
});
var lat = localStorage.getItem('lat');
var lon = localStorage.getItem('lon');
console.log(lat);
console.log(lon);

var forecastQueryURL = "http://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid="+APIKey;
$.ajax({
  url:forecastQueryURL,
  method: "GET"
}).then(function(response) {

  console.log(response);

});

// var queryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + ",{state code}," + "{countryCode}" + "&limit=5&appid=" + APIKey;

// // We then created an AJAX call
// $.ajax({
//   url: queryURL,
//   method: "GET"
// }).then(function(response) {

//   console.log(response);

// });