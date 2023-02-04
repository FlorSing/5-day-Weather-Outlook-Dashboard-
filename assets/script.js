

//determine what city is being searched
function getSearchTextValue(){
  var searchInput = $("#search-input").val();
  localStorage.setItem('searchText', searchInput);}

$("#search-button").on('click', function(){
  var addCity = localStorage.getItem('searchText');
  cities.push(addCity);
  
getSearchTextValue()});

readText = localStorage.getItem('searchText');
// console.log(readText);
// $("#search-input").val(readText);


cities = [];
$("#history").empty();

function renderButtons() {
  var a = $("<button>").addClass("cities").text(readText);
  // citiesList.push(a);
   $("#history").append(a);};


  // for (var i = 0; i < cities.length; i++) {
  //   var a = $("<button>").addClass("cities").attr("data-name",cities[i]).text(cities[i]);
  //   citiesDiv = $("<div class='citiesList'>");
  //   citiesListElement = $('<p>').appendTo(citiesDiv);
  //   citiesListSearch = citiesListElement.append(readText);
  //   cityHist = $('#history');
  //   citiesListSearch.appendTo(cityHist);
  // }

 
renderButtons();


//event listener for city button element

// $("button").on("click", function() {
//   var city = $(this).attr("data-city");

// });

var cityName = readText;
var APIKey = "72380dfb30d88ca9844eebc1d2827077";

//use the searched item in api url query
function getGeoLocRequest(){
  var getGeoLocURL = "http://api.openweathermap.org/geo/1.0/direct?q="+cityName+"&limit=5&appid="+APIKey;
  $.ajax({
    url: getGeoLocURL,
    method: "GET"
  }).then(function(geoLoc) {
    var geoLocArray = geoLoc
    localStorage.setItem('lat',geoLocArray[0].lat);
    localStorage.setItem('lon',geoLocArray[0].lon);
    localStorage.setItem('city',geoLocArray[0].name);
    // localStorage.setItem('country',geoLocArray[0].country);
});
}

//set geo location

getGeoLocRequest();

var city = localStorage.getItem('city');
// var country = localStorage.getItem('country');
var lat = localStorage.getItem('lat');
var lon = localStorage.getItem('lon');


//url query output for use on dashboard = city, temp, wind, humidity

function getCityWeatherRequest(){

var currentQueryURL = "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid="+APIKey;
$.ajax({
  url:currentQueryURL,
  method: "GET"
}).then(function(currentWeather) {
  console.log(currentWeather);
  localStorage.setItem('dateCurrW',currentWeather.dt);
  localStorage.setItem('iconCurrW',currentWeather.weather[0].icon);
  localStorage.setItem('tempCurrW',currentWeather.main.temp);
  localStorage.setItem('windCurrW',currentWeather.wind.speed);
  localStorage.setItem('humidityCurrW',currentWeather.main.humidity);
})

var forecastQueryURL = "http://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid="+APIKey;
$.ajax({
  url:forecastQueryURL,
  method: "GET"
}).then(function(weather) {
  console.log(weather);

  
  var fore1Weather = weather.list[4]; //day one forecast data
  var fore2Weather = weather.list[12]; // day 2 forecast
  var fore3Weather = weather.list[20]; //day 3 forecast
  var fore4Weather = weather.list[28]; //day 4 forecast
  var fore5Weather = weather.list[36];  //day 5

  // store data for weather details for each day
  localStorage.setItem('dateFore1W',fore1Weather.dt);
  localStorage.setItem('iconFore1W',fore1Weather.weather[0].icon);
  localStorage.setItem('tempFore1W',fore1Weather.main.temp);
  localStorage.setItem('windFore1W',fore1Weather.wind.speed);
  localStorage.setItem('humidityFore1W',fore1Weather.main.humidity);
  
  localStorage.setItem('dateFore2W',fore2Weather.dt);
  localStorage.setItem('iconFore2W',fore2Weather.weather[0].icon);
  localStorage.setItem('tempFore2W',fore2Weather.main.temp);
  localStorage.setItem('windFore2W',fore2Weather.wind.speed);
  localStorage.setItem('humidityFore2W',fore2Weather.main.humidity);
  
  localStorage.setItem('dateFore3W',fore3Weather.dt);
  localStorage.setItem('iconFore3W',fore3Weather.weather[0].icon);
  localStorage.setItem('tempFore3W',fore3Weather.main.temp);
  localStorage.setItem('windFore3W',fore3Weather.wind.speed);
  localStorage.setItem('humidityFore3W',fore3Weather.main.humidity);
  
  localStorage.setItem('dateFore4W',fore4Weather.dt);
  localStorage.setItem('iconFore4W',fore4Weather.weather[0].icon);
  localStorage.setItem('tempFore4W',fore4Weather.main.temp);
  localStorage.setItem('windFore4W',fore4Weather.wind.speed);
  localStorage.setItem('humidityFore4W',fore4Weather.main.humidity);
  
  localStorage.setItem('dateFore5W',fore5Weather.dt);
  localStorage.setItem('iconFore5W',fore5Weather.weather[0].icon);
  localStorage.setItem('tempFore5W',fore5Weather.main.temp);
  localStorage.setItem('windFore5W',fore5Weather.wind.speed);
  localStorage.setItem('humidityFore5W',fore5Weather.main.humidity);
  
})
};

getCityWeatherRequest();


//get each data item and give correct format

var dateCurrW = moment.unix(localStorage.getItem('dateCurrW')).format('DD MMM YYYY');
var iconCurrW = localStorage.getItem('iconCurrW');
var tempCurrW = ((localStorage.getItem('tempCurrW'))-273.15).toFixed(0);
var windCurrW = localStorage.getItem('windCurrW');
var humidityCurrW = localStorage.getItem('humidityCurrW');

var dateFore1W = moment.unix(localStorage.getItem('dateFore1W')).format('DD MMM YYYY');
var iconFore1W = localStorage.getItem('iconFore1W');
var tempFore1W = ('Temp: '+((localStorage.getItem('tempFore1W'))-273.15).toFixed(0))+" °C";
var windFore1W = ('Wind: '+(localStorage.getItem('windFore1W'))+" kph");
var humidityFore1W = ('Humidity: '+(localStorage.getItem('humidityFore1W'))+"%");

var dateFore2W = moment.unix(localStorage.getItem('dateFore2W')).format('DD MMM YYYY');
var iconFore2W = localStorage.getItem('iconFore2W');
var tempFore2W = ('Temp: '+((localStorage.getItem('tempFore2W'))-273.15).toFixed(0))+" °C";
var windFore2W = ('Wind: '+(localStorage.getItem('windFore2W'))+" kph");
var humidityFore2W = ('Humidity: '+(localStorage.getItem('humidityFore2W'))+"%");

var dateFore3W = moment.unix(localStorage.getItem('dateFore3W')).format('DD MMM YYYY');
var iconFore3W = localStorage.getItem('iconFore3W');
var tempFore3W = ('Temp: '+((localStorage.getItem('tempFore3W'))-273.15).toFixed(0))+" °C";
var windFore3W = ('Wind: '+(localStorage.getItem('windFore3W'))+" kph");
var humidityFore3W = ('Humidity: '+(localStorage.getItem('humidityFore3W'))+"%");

var dateFore4W = moment.unix(localStorage.getItem('dateFore4W')).format('DD MMM YYYY');
var iconFore4W = localStorage.getItem('iconFore4W');
var tempFore4W = ('Temp: '+((localStorage.getItem('tempFore4W'))-273.15).toFixed(0))+" °C";
var windFore4W = ('Wind: '+(localStorage.getItem('windFore4W'))+" kph");
var humidityFore4W = ('Humidity: '+(localStorage.getItem('humidityFore4W'))+"%");

var dateFore5W = moment.unix(localStorage.getItem('dateFore5W')).format('DD MMM YYYY');
var iconFore5W = localStorage.getItem('iconFore5W');
var tempFore5W = ('Temp: '+((localStorage.getItem('tempFore5W'))-273.15).toFixed(0))+" °C";
var windFore5W = ('Wind: '+(localStorage.getItem('windFore5W'))+" kph");
var humidityFore5W = ('Humidity: '+(localStorage.getItem('humidityFore5W'))+"%");

// get url link for icons

iconURLtop = "http://openweathermap.org/img/wn/"+iconCurrW+"@2x.png";
iconURLfore1 = "http://openweathermap.org/img/wn/"+iconFore1W+"@2x.png";
iconURLfore2 = "http://openweathermap.org/img/wn/"+iconFore2W+"@2x.png";
iconURLfore3 = "http://openweathermap.org/img/wn/"+iconFore3W+"@2x.png";
iconURLfore4 = "http://openweathermap.org/img/wn/"+iconFore4W+"@2x.png";
iconURLfore5 = "http://openweathermap.org/img/wn/"+iconFore5W+"@2x.png";

// set headline weather data

$("<h2>").appendTo($('#today')).text(cityName + " ("+ dateCurrW+")");
$("<img>").appendTo($('#today')).attr("src", iconURLtop);
$("<p>").appendTo($('#today')).text('Temp: '+tempCurrW+" °C");
$("<p>").appendTo($('#today')).text('Wind: '+windCurrW+" kph");
$("<p>").appendTo($('#today')).text('Humidity: '+humidityCurrW+"%");

//set 5-day forecast data

// $('#day1Date').text(dateFore1W);
// $("<img>").appendTo($('#day1')).attr("src", iconURLfore1);
// $("<p>").appendTo$('#day1').text('Temp: '+tempFore1W+" °C");
// $("<p>").appendTo$('#day1').text('Wind: '+windFore1W+" kph");
// $("<p>").appendTo$('#day1').text('Humidity: '+humidityFore1W+"%");

// // $('#day2Date').text(dateFore2W);
// // $('#day2Icon').append(iconURLfore2);
// // $("<p>").appendTo$('#day2').text(tempFore2W);
// // $("<p>").appendTo$('#day2').text(windFore2W);
// // $("<p>").appendTo$('#day2').text(humidityFore2W);

// // $('#day3Date').text(dateFore3W);
// // $('#day3Icon').append(iconURLfore3);
// // $("<p>").appendTo$('#day3').text(tempFore3W);
// // $("<p>").appendTo$('#day3').text(windFore3W);
// // $("<p>").appendTo$('#day3').text(humidityFore3W);

// // $('#day4Date').text(dateFore4W);
// // $('#day4Icon').append(iconURLfore4);
// // $("<p>").appendTo$('#day4').text(tempFore4W);
// // $("<p>").appendTo$('#day4').text(windFore4W);
// // $("<p>").appendTo$('#day4').text(humidityFore4W);

// // $('#day5Date').text(dateFore5W);
// // $('#day5Icon').append(iconURLfore5);
// // $("<p>").appendTo$('#day5').text(tempFore5W);
// // $("<p>").appendTo$('#day5').text(windFore5W);
// // $("<p>").appendTo$('#day5').text(humidityFore5W);









foreTbl = $("<table>").appendTo($('#forecast'));

foreTblData = $("<tbody>").appendTo(foreTbl);

foreTblDataRow1 = $("<tr>").appendTo(foreTblData);
date1Row = $("<th scope = 'col'>").text(dateFore1W).appendTo(foreTblDataRow1);
date2Row = $("<th scope = 'col'>").text(dateFore2W).appendTo(foreTblDataRow1);
date3Row = $("<th scope = 'col'>").text(dateFore3W).appendTo(foreTblDataRow1);
date4Row = $("<th scope = 'col'>").text(dateFore4W).appendTo(foreTblDataRow1);
date5Row = $("<th scope = 'col'>").text(dateFore5W).appendTo(foreTblDataRow1);

// // foreTblIconRow = $("<tr>").appendTo(foreTblData);
// // icon1Row = $("<img>").attr("src", iconURLfore1).appendTo(foreTblIconRow);
// // icon2Row = $("<img>").attr("src", iconURLfore2).appendTo(foreTblIconRow);
// // icon3Row = $("<img>").attr("src", iconURLfore3).appendTo(foreTblIconRow);
// // icon4Row = $("<img>").attr("src", iconURLfore4).appendTo(foreTblIconRow);
// // icon6Row = $("<img>").attr("src", iconURLfore5).appendTo(foreTblIconRow);

// foreTblIconRow = $("<tr>").appendTo(foreTblData);
// icon1Row = $("<img>").attr("src", iconURLfore1).appendTo(foreTblIconRow);
// icon2Row = $("<img>").attr("src", iconURLfore2).appendTo(foreTblIconRow);
// icon3Row = $("<img>").attr("src", iconURLfore3).appendTo(foreTblIconRow);
// icon4Row = $("<img>").attr("src", iconURLfore4).appendTo(foreTblIconRow);
// icon6Row = $("<img>").attr("src", iconURLfore5).appendTo(foreTblIconRow);

foreTblDataRow2 = $("<tr>").appendTo(foreTblData);
temp1Row2 = $("<td>").text(tempFore1W).appendTo(foreTblDataRow2);
temp2Row2 = $("<td>").text(tempFore2W).appendTo(foreTblDataRow2);
temp3Row2 = $("<td>").text(tempFore3W).appendTo(foreTblDataRow2);
temp4Row2 = $("<td>").text(tempFore4W).appendTo(foreTblDataRow2);
temp5Row2 = $("<td>").text(tempFore5W).appendTo(foreTblDataRow2);

foreTblDataRow3 = $("<tr>").appendTo(foreTblData);
wind1Row3 = $("<td>").text(windFore1W).appendTo(foreTblDataRow3);
wind2Row3 = $("<td>").text(windFore2W).appendTo(foreTblDataRow3);
wind3Row3 = $("<td>").text(windFore3W).appendTo(foreTblDataRow3);
wind4Row3 = $("<td>").text(windFore4W).appendTo(foreTblDataRow3);
wind5Row3 = $("<td>").text(windFore5W).appendTo(foreTblDataRow3);

foreTblDataRow4 = $("<tr>").appendTo(foreTblData);
humidity1Row4 = $("<td>").text(humidityFore1W).appendTo(foreTblDataRow4);
humidity2Row4 = $("<td>").text(humidityFore2W).appendTo(foreTblDataRow4);
humidity3Row4 = $("<td>").text(humidityFore3W).appendTo(foreTblDataRow4);
humidity4Row4 = $("<td>").text(humidityFore4W).appendTo(foreTblDataRow4);
humidity5Row4 = $("<td>").text(humidityFore5W).appendTo(foreTblDataRow4);


